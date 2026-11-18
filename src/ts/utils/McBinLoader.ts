import * as THREE from 'three';

// Gemini'd piece of shit. Not yet fully understood but working well enough.

export interface McBinCameraPose {
  /** Minecraft yaw in degrees (0 = South/+Z, 90 = West/-X, 180 = North/-Z, -90 = East/+X) */
  yaw: number;
  /** Minecraft pitch in degrees (-90 = Up/+Y, 0 = Horizon, +90 = Down/-Y) */
  pitch: number;
  /** Exact camera position in Three.js world space (already shifted by bx, by, bz) */
  position: THREE.Vector3;
}

export interface McBinParsedModel {
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshLambertMaterial[]>;
  textures: THREE.Texture[];
  materials: THREE.MeshLambertMaterial[];
  size: THREE.Vector3;
  center: THREE.Vector3;
  quadCount: number;
  version: number;
  cameraPose: McBinCameraPose;
  dispose: () => void;
}

const MCBN_MAGIC = 0x4d43424e; // "MCBN"

export async function loadMcBinFromUrl(
  url: string,
  signal?: AbortSignal
): Promise<McBinParsedModel> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch .mcbin (${response.status} ${response.statusText}): ${url}`);
  }
  const buffer = await response.arrayBuffer();
  return parseMcBinBuffer(buffer);
}

export async function parseMcBinBuffer(buffer: ArrayBuffer): Promise<McBinParsedModel> {
  const view = new DataView(buffer);
  let offset = 0;

  if (buffer.byteLength < 14) {
    throw new Error('Invalid .mcbin file: buffer too small.');
  }

  const magic = view.getUint32(offset, false);
  offset += 4;
  if (magic !== MCBN_MAGIC) {
    throw new Error(`Invalid .mcbin magic header: 0x${magic.toString(16)}`);
  }

  const version = view.getUint8(offset);
  offset += 1;
  if (version !== 1 && version !== 2) {
    throw new Error(`Unsupported .mcbin version: ${version}`);
  }

  const sizeX = view.getUint16(offset, false);
  offset += 2;
  const sizeY = view.getUint16(offset, false);
  offset += 2;
  const sizeZ = view.getUint16(offset, false);
  offset += 2;

  // Offset applied to all grid coordinates [0..sizeX, 0..sizeY, 0..sizeZ]
  const bx = -Math.floor(sizeX / 2);
  const by = 0;
  const bz = -Math.floor(sizeZ / 2);

  let cameraYaw = 135;
  let cameraPitch = 25;
  let camLocalX = sizeX * 0.5;
  let camLocalY = sizeY * 0.8;
  let camLocalZ = sizeZ * 0.5;

  if (version >= 2) {
    cameraYaw = view.getFloat32(offset, false);
    offset += 4;
    cameraPitch = view.getFloat32(offset, false);
    offset += 4;
    camLocalX = view.getFloat32(offset, false);
    offset += 4;
    camLocalY = view.getFloat32(offset, false);
    offset += 4;
    camLocalZ = view.getFloat32(offset, false);
    offset += 4;
  }

  const textureCount = view.getUint16(offset, false);
  offset += 2;
  const materialCount = view.getUint16(offset, false);
  offset += 2;

  // 1. Decode embedded PNGs
  const rawPngSlices: Uint8Array[] = [];
  for (let i = 0; i < textureCount; i++) {
    const byteLen = view.getInt32(offset, false);
    offset += 4;
    rawPngSlices.push(new Uint8Array(buffer, offset, byteLen));
    offset += byteLen;
  }

  const textures = await Promise.all(rawPngSlices.map(decodePngToNearestTexture));

  // 2. Read Material Table
  interface MatEntry {
    textureIndex: number;
    tintRGB: number;
    quadCount: number;
  }

  const matEntries: MatEntry[] = [];
  let totalQuads = 0;

  for (let i = 0; i < materialCount; i++) {
    const textureIndex = view.getUint16(offset, false);
    offset += 2;
    const tintRGB = view.getInt32(offset, false) & 0xffffff;
    offset += 4;
    const quadCount = view.getInt32(offset, false);
    offset += 4;
    matEntries.push({ textureIndex, tintRGB, quadCount });
    totalQuads += quadCount;
  }

  // 3. Build BufferGeometry
  const positions = new Float32Array(totalQuads * 4 * 3);
  const normals = new Float32Array(totalQuads * 4 * 3);
  const uvs = new Float32Array(totalQuads * 4 * 2);
  const indices = new Uint32Array(totalQuads * 6);

  const geometry = new THREE.BufferGeometry();
  const materials: THREE.MeshLambertMaterial[] = [];

  let quadCursor = 0;

  for (let m = 0; m < materialCount; m++) {
    const entry = matEntries[m];
    const tex = textures[entry.textureIndex] ?? null;

    const mat = new THREE.MeshLambertMaterial({
      map: tex,
      color: new THREE.Color(entry.tintRGB),
      alphaTest: 0.1,
      side: THREE.FrontSide,
    });
    materials.push(mat);

    const groupStartIndex = quadCursor * 6;
    const groupIndexCount = entry.quadCount * 6;
    geometry.addGroup(groupStartIndex, groupIndexCount, m);

    for (let q = 0; q < entry.quadCount; q++) {
      const dir = view.getUint8(offset);
      offset += 1;
      const d = view.getUint16(offset, false);
      offset += 2;
      const u = view.getUint16(offset, false);
      offset += 2;
      const v = view.getUint16(offset, false);
      offset += 2;
      const w = view.getUint16(offset, false);
      offset += 2;
      const h = view.getUint16(offset, false);
      offset += 2;

      writeGreedyQuadToBuffers(
        quadCursor,
        dir,
        d,
        u,
        v,
        w,
        h,
        bx,
        by,
        bz,
        positions,
        normals,
        uvs,
        indices
      );
      quadCursor++;
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  const mesh = new THREE.Mesh(geometry, materials);
  const center = new THREE.Vector3(bx + sizeX * 0.5, by + sizeY * 0.5, bz + sizeZ * 0.5);
  const size = new THREE.Vector3(sizeX, sizeY, sizeZ);

  // Shift the grid-local camera coordinates by the exact same (bx, by, bz) as the vertices
  const cameraWorldPosition = new THREE.Vector3(
    bx + camLocalX,
    by + camLocalY,
    bz + camLocalZ
  );

  const dispose = () => {
    geometry.dispose();
    for (const mat of materials) {
      mat.dispose();
    }
    for (const tex of textures) {
      tex.dispose();
    }
  };

  return {
    mesh,
    textures,
    materials,
    size,
    center,
    quadCount: totalQuads,
    version,
    cameraPose: {
      yaw: cameraYaw,
      pitch: cameraPitch,
      position: cameraWorldPosition,
    },
    dispose,
  };
}

/**
 * Places the camera at the exact screenshot position and angle, and returns
 * an OrbitControls target directly along the look ray so OrbitControls
 * preserves the exact screenshot view before the user moves the camera.
 */
export function applyScreenshotCameraPose(
  camera: THREE.PerspectiveCamera,
  model: McBinParsedModel
): THREE.Vector3 {
  const camPos = model.cameraPose.position;

  // Clamp pitch slightly away from +-90 deg to prevent OrbitControls gimbal lock
  const clampedPitch = THREE.MathUtils.clamp(model.cameraPose.pitch, -89.9, 89.9);
  const yawRad = THREE.MathUtils.degToRad(model.cameraPose.yaw);
  const pitchRad = THREE.MathUtils.degToRad(clampedPitch);

  // Exact Minecraft Entity.calculateViewVector(pitch, yaw) formula:
  const lookDir = new THREE.Vector3(
    -Math.sin(yawRad) * Math.cos(pitchRad),
    -Math.sin(pitchRad),
    Math.cos(yawRad) * Math.cos(pitchRad)
  ).normalize();

  // 1. Put camera at the exact screenshot eye position
  camera.position.copy(camPos);

  // 2. Find where along `lookDir` the player was looking so OrbitControls
  //    pivots around that block when the user later drags the mouse,
  //    WITHOUT changing the initial camera position or look angle.
  const raycaster = new THREE.Raycaster(camPos, lookDir, 0.2, 1000);
  const hits = raycaster.intersectObject(model.mesh, false);

  let targetDistance = 16;
  if (hits.length > 0 && hits[0].distance > 0.5) {
    targetDistance = hits[0].distance;
  } else {
    const toCenter = model.center.clone().sub(camPos);
    const projected = toCenter.dot(lookDir);
    if (projected > 1) {
      targetDistance = projected;
    }
  }

  // Because `target` lies strictly along `camPos + lookDir * targetDistance`,
  // `camera.lookAt(target)` and `controls.update()` keep the exact (yaw, pitch) and position!
  const target = camPos.clone().addScaledVector(lookDir, targetDistance);
  camera.lookAt(target);

  return target;
}

function writeGreedyQuadToBuffers(
  quadIdx: number,
  dir: number,
  d: number,
  u: number,
  v: number,
  w: number,
  h: number,
  bx: number,
  by: number,
  bz: number,
  positions: Float32Array,
  normals: Float32Array,
  uvs: Float32Array,
  indices: Uint32Array
): void {
  const vBase = quadIdx * 12;
  const uvBase = quadIdx * 8;
  const iBase = quadIdx * 6;
  const vertOffset = quadIdx * 4;

  let nx = 0;
  let ny = 0;
  let nz = 0;

  switch (dir) {
    case 0: {
      // DOWN (-Y)
      const x0 = bx + u, x1 = x0 + w, y0 = by + d, z0 = bz + v, z1 = z0 + h;
      setQuadPositions(positions, vBase, x0, y0, z0, x1, y0, z0, x1, y0, z1, x0, y0, z1);
      ny = -1;
      break;
    }
    case 1: {
      // UP (+Y)
      const x0 = bx + u, x1 = x0 + w, y1 = by + d + 1, z0 = bz + v, z1 = z0 + h;
      setQuadPositions(positions, vBase, x0, y1, z1, x1, y1, z1, x1, y1, z0, x0, y1, z0);
      ny = 1;
      break;
    }
    case 2: {
      // NORTH (-Z)
      const x0 = bx + u, x1 = x0 + w, y0 = by + v, y1 = y0 + h, z0 = bz + d;
      setQuadPositions(positions, vBase, x1, y0, z0, x0, y0, z0, x0, y1, z0, x1, y1, z0);
      nz = -1;
      break;
    }
    case 3: {
      // SOUTH (+Z)
      const x0 = bx + u, x1 = x0 + w, y0 = by + v, y1 = y0 + h, z1 = bz + d + 1;
      setQuadPositions(positions, vBase, x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y1, z1);
      nz = 1;
      break;
    }
    case 4: {
      // WEST (-X)
      const x0 = bx + d, y0 = by + v, y1 = y0 + h, z0 = bz + u, z1 = z0 + w;
      setQuadPositions(positions, vBase, x0, y0, z0, x0, y0, z1, x0, y1, z1, x0, y1, z0);
      nx = -1;
      break;
    }
    default: {
      // EAST (+X)
      const x1 = bx + d + 1, y0 = by + v, y1 = y0 + h, z0 = bz + u, z1 = z0 + w;
      setQuadPositions(positions, vBase, x1, y0, z1, x1, y0, z0, x1, y1, z0, x1, y1, z1);
      nx = 1;
      break;
    }
  }

  for (let i = 0; i < 4; i++) {
    normals[vBase + i * 3] = nx;
    normals[vBase + i * 3 + 1] = ny;
    normals[vBase + i * 3 + 2] = nz;
  }

  uvs[uvBase] = 0;     uvs[uvBase + 1] = 0;
  uvs[uvBase + 2] = w; uvs[uvBase + 3] = 0;
  uvs[uvBase + 4] = w; uvs[uvBase + 5] = h;
  uvs[uvBase + 6] = 0; uvs[uvBase + 7] = h;

  indices[iBase] = vertOffset;
  indices[iBase + 1] = vertOffset + 1;
  indices[iBase + 2] = vertOffset + 2;
  indices[iBase + 3] = vertOffset;
  indices[iBase + 4] = vertOffset + 2;
  indices[iBase + 5] = vertOffset + 3;
}

function setQuadPositions(
  out: Float32Array,
  base: number,
  x0: number, y0: number, z0: number,
  x1: number, y1: number, z1: number,
  x2: number, y2: number, z2: number,
  x3: number, y3: number, z3: number
): void {
  out[base] = x0;     out[base + 1] = y0;     out[base + 2] = z0;
  out[base + 3] = x1; out[base + 4] = y1;     out[base + 5] = z1;
  out[base + 6] = x2; out[base + 7] = y2;     out[base + 8] = z2;
  out[base + 9] = x3; out[base + 10] = y3;    out[base + 11] = z3;
}

async function decodePngToNearestTexture(pngBytes: Uint8Array): Promise<THREE.Texture> {
  const blob = new Blob([pngBytes as BlobPart], { type: 'image/png' });
  const bitmap = await createImageBitmap(blob, { imageOrientation: 'flipY' });

  const texture = new THREE.Texture(bitmap);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}