<template>
    <div id="callback"></div>
</template>

<script>
import CC from "@/services/CC";

export default {
    mounted() {
        CC.injectCallback(
            process.env.VUE_APP_API_CLIENT_ID,
            process.env.VUE_APP_API_CLIENT_REDIRECT,
            "https://api.local.contractorcompliance.io/"
        );
    },
};
</script>

<style></style>
