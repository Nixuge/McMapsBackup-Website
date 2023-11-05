<script setup lang="ts">
import SearchButton from '@/components/server/searchbar/SearchButton.vue'

// TODO: REMOVE & MOVE TO THE POPUP VERSION
</script>

<template>
    <SearchButton text="Go back home?" href="/" /> <!-- Using SearchBar elements for here smh -->
    <br>
    <h1>Download for everything:</h1>
    <h2><a href="/static/maps.zip">Feel free to hit on that bandwidth</a></h2>
    <br>
    <h1>API endpoints</h1>
    <h2>As this is basically serverless (everything is done client-side), the only api endpoint is the full json for the
        maps</h2>
        <h4>Which is <span class="smol">(NOT YET BUT WILL SOON BE)</span> located at <a href="/static/maps.json">/static/maps.json</a></h4>
    
    <h2>Here's some info for the preview & download URLs, as the json doesn't include full pathes</h2>
    <br>
    <h1>The base URL is the following:</h1>
    <h2>/static/[zip or img]/[nano if nano, otherwise nothing]/[sanitized minigame (see below)]/</h2>
    <br>
    <h1>To this base URL you can then add:</h1>
    <h2>To get the preview image (use "img" in the url):</h2>
    <h2>[sanitized mapname].png </h2>
    <h2>To get a map download (use "zip" in the url):</h2>
    <h2>[download url (value in dict) from the downloads dict]</h2>
    <br>
    <h1>URL examples:</h1>
    <h2><a href="/static/zip/thebridges/seretopia_base.zip">/static/zip/thebridges/seretopia_base.zip</a> (Seretopia map from Bridges, base version without the bridges)</h2>
    <h2><a href="/static/zip/nano/zombiesurvival/boscage.zip">/static/zip/nano/zombiesurvival/boscage.zip</a> (Boscage map from Nano Game's Zombie Survival)</h2>
    <h2><a href="/static/img/nano/zombiesurvival/boscage.png">/static/img/nano/zombiesurvival/boscage.png</a> (Boscage preview from Nano Game's Zombie Survival)</h2>
    <br>
    <h1>Sanitize function used:</h1>
    <h2>
        const validChars = "abcdefghijklmnopqrstuvwxyz0123456789"<br>
        export function sanitize(text: string) {<br>
          let newText = ""<br>
          for (const char of text.toLowerCase()) {<br>
            if (validChars.includes(char)) {<br>
              newText += char;<br>
            }<br>
          }<br>
          return newText;<br>
        }
    </h2>
    <h2>Nothing really complicated, you can replicate easily in another language</h2>
    <h2>Just lower the input and remove all non alphabetical/numerical characters (including spaces)</h2>
</template>


<style scoped>
h1,
h2,
h4 {
    margin: 0;
}

a,
a:visited {
    color: #fff;
}
.smol {
    font-size: 10px;
}
</style>
