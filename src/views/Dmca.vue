<script setup lang="ts">
import SearchButton from '@/components/server/searchbar/SearchButton.vue'
</script>

<template>
    <SearchButton text="Go back home?" href="/" />
    <br><br>
    <div class="center">
        <h1>Send DMCA inquiries to dmca@nixuge.me</h1>
        <br>
        <h1>Make SURE your email gets sent, as some providers don't seem to like Cloudflare proxied emails.</h1>
        <br>
        <h1>Sending an email from gmail is basically sure to work.</h1>
        <h1>If another provider doesn't work, just send me an email from an (even non official) gmail account & i'll eventually provide you with another email that should work everywhere.</h1>
    </div>
</template>


<style scoped>
h1 {
    margin: 0;
}

.center {
    text-align: center;
}
</style>
