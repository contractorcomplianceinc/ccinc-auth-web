<template>
    <div id="callback">Great success</div>
</template>

<script>
import CC from "@/services/CC";

export default {
    mounted() {
        CC.injectCallback(
            process.env.VUE_APP_API_CLIENT_ID,
            process.env.VUE_APP_API_CLIENT_REDIRECT,
            "https://api.local.cc.io/"
        );
    },
};
</script>

<style></style>
