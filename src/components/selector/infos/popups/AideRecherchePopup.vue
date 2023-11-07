<script setup lang="ts">

const BASE_URL = (process.env.NODE_ENV == "development") ? 
    "https://maps.nixuge.me/static/" : 
    "static/";
</script>

<template>
    <h1>Aide pour la recherche</h1>
    <div class="centeredContent">
        <h3>Rechercher une map spécifique devrait être plutôt facile</h3>
        <div class="taghelp">
            <p class="taghelptext">Cliquer sur ce bouton devrait faire apparaitre une popup avec la liste de tags pour le serveur</p>
            <img :src="BASE_URL + 'help/searchtag.png'">
            <p>...sur laquelle vous devriez pouvoir être capable de sélectionner ce qu'il vous faut.</p>
            <br>
            <p>Vous pouvez aussi chercher le nom d'une map, ou juste écrire les tags vous même.</p>
        </div>
    </div>
    
</template>

<style scoped>
.centeredContent {
    display: inline-block;
    width: fit-content;
}
/* .taghelp {
    display: flex;
    justify-content: center;
    align-items: center;
} */
.taghelptext {
    margin-left: 10px;
}
h1 {
    margin-bottom: 0;
}
h3 {
    margin-bottom: 10px;
}
p {
    margin: 0;
}
</style>