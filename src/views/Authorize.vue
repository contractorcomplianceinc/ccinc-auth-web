<template>
    <div>
        <h1>Authorize</h1>

        <v-btn @click="$store.dispatch('OAUTH_AUTHORIZE')"> Auth Redirect </v-btn>

        <v-btn @click="authorize()"> Auth Popup </v-btn>

        <v-btn @click="getParams()"> Params </v-btn>

        <v-btn @click="getToken()">Get Token</v-btn>

        <v-dialog v-model="showAuthDialog">
            <v-card>
                <v-card-title>
                    <h2>Authorize</h2>
                    <p>
                        {{ $store.getters.authUrl }}
                    </p>
                </v-card-title>
                <div style="height: 30em">
                    <iframe id="authIFrame" :src="$store.getters.authUrl" width="100%" height="100%" />
                </div>
                <v-card-actions>
                    <v-btn @click="sendDataToIFrame()">Extract Code from iFrame</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="py-10">
            <h2>Auth Info</h2>
            <KeyValueTable :items="data" />
        </div>
    </div>
</template>

<script>
import KeyValueTable from "@/components/debugging/KeyValueTable";
export default {
    components: {
        KeyValueTable,
    },
    data() {
        return {
            showAuthDialog: false,
            hasListener: false,
            data: {},
        };
    },
    methods: {
        authorize() {
            this.showAuthDialog = true;
        },
        getParams() {
            let code = this.$route.query.code;
            this.data = {
                ...this.data,
                code: code,
            };
        },
        getToken() {
            this.$store.dispatch("OAUTH_TOKEN_CODE", this.data.code).then((res) => {
                this.data = {
                    ...this.data,
                    token: res.data.access_token,
                };
            });
        },
        sendDataToIFrame() {
            // var popup = document.getElementById("authIFrame");
            var popup = window.frames[0];
            var targetUrl = "http://localhost:8081";
            // var targetUrl = "https://api.local.contractorcompliance.io";

            // When the popup has fully loaded, if not blocked by a popup blocker:

            // This does nothing, assuming the window hasn't changed its location.
            // popup.postMessage("The user is 'bob' and the password is 'secret'", targetUrl);

            // This will successfully queue a message to be sent to the popup, assuming
            // the window hasn't changed its location.
            popup.postMessage("get-code", targetUrl);
        },
        registerListener() {
            if (!this.hasListener) {
                console.log("Registering message event listener - Authorize");
                window.addEventListener(
                    "message",
                    (event) => {
                        let expectedOrigin = "http://localhost:8081";

                        // Do we trust the sender of this message?
                        if (event.origin !== expectedOrigin) {
                            console.debug(
                                "event.origin did not match expected source. Returning",
                                event.origin,
                                expectedOrigin
                            );
                            return;
                        }

                        if (event.data.code != null) {
                            this.data.code = event.data.code;
                            this.$store.commit("SET_AUTH_BEARER", event.data.code);
                            // this.$router.push("user");
                        }
                    },
                    false
                );
                this.hasListener = true;
            }
        },
    },
    mounted() {
        this.getParams();
        this.registerListener();
    },
    watch: {
        "$route.query": {
            handler: function (newValue) {
                this.getParams();
            },
            deep: true,
        },
    },
};
</script>

<style></style>
