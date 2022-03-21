<template>
    <div class="container">
        <LoginCC />

        <v-btn @click="$store.dispatch('OAUTH_AUTHORIZE')">Authorize</v-btn>
    </div>
</template>

<script>
import LoginCC from "@/components/auth/LoginCC.vue";

export default {
    components: {
        LoginCC,
    },
};
</script>

<style></style>
