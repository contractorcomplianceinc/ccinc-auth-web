<template>
    <div>
        <h1>Authorize</h1>

        <!-- <v-btn @click="$store.dispatch('OAUTH_AUTHORIZE')"> Auth Redirect </v-btn> -->

        <v-btn @click="showDialog()"> Click Here to Login with Contractor Compliance </v-btn>

        <!-- <v-btn @click="getParams()"> Params </v-btn> -->

        <v-btn @click="getToken()">Get Token</v-btn>

        <v-dialog v-model="showAuthDialog" persistent eager>
            <v-card>
                <v-card-title>
                    <h2>Authorize</h2>
                </v-card-title>
                <div style="height: 30em" id="callback-iframe">
                    <!-- <iframe id="authIFrame" :src="$store.getters.authUrl" width="100%" height="100%" /> -->
                </div>
                <v-card-actions>
                    <v-btn @click="closeDialog()">Close</v-btn>
                    <v-btn @click="sendDataToIFrame()">Trigger</v-btn>"
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import CC from "@/services/CC";

export default {
    components: {},
    data() {
        return {
            showAuthDialog: false,
            hasListener: false,
            data: {},
        };
    },
    mounted() {
        // this.getParams();
        // this.registerListener();
    },
    methods: {
    //     everything() {
    //         this.showAuthDialog = true;
    //         this.sendDataToIFrame().then((res) => {
    //             this.getToken().then(() => {
    //                 this.showAuthDialog = false;
    //             });
    //         });
    //     },
    //     closeAuthDialog() {
    //         this.sendDataToIFrame().then((res) => {
    //             this.sleep(1000).then(() => {
    //                 this.showAuthDialog = false;
    //                 // this.getToken();
    //             });
    //         });
    //     },
        showDialog() {
            this.showAuthDialog = true;
            CC.createCallbackIframe();
        },
        closeDialog(){
            this.showAuthDialog = false;
        }
    //     getParams() {
    //         let code = this.$route.query.code;
    //         this.data = {
    //             ...this.data,
    //             code: code,
    //         };
    //     },
    //     getToken() {
    //         return this.$store.dispatch("OAUTH_TOKEN_CODE", this.data.code).then((res) => {
    //             this.data = {
    //                 ...this.data,
    //                 token: res.data.access_token,
    //             };
    //             return res.data.access_token;
    //         });
    //     },
    //     sendDataToIFrame() {
    //         return new Promise((resolve, reject) => {
    //             console.debug("sendDataToIFrame");

    //             try {
    //                 var popup = window.frames[0];
    //                 var targetUrl = "http://localhost:8081";

    //                 popup.postMessage("get-code", targetUrl);
    //                 resolve(true);
    //             } catch (e) {
    //                 console.warn("Couldn't send get-code cmd", e);
    //                 reject(e);
    //             }
    //         });
    //     },
    //     sleep(ms) {
    //         return new Promise((resolve) => setTimeout(resolve, ms));
    //     },
    //     registerListener() {
    //         if (!this.hasListener) {
    //             console.log("Registering message event listener - Authorize");
    //             window.addEventListener(
    //                 "message",
    //                 (event) => {
    //                     let expectedOrigin = "http://localhost:8081";

    //                     // Do we trust the sender of this message?
    //                     if (event.origin !== expectedOrigin) {
    //                         console.debug(
    //                             "event.origin did not match expected source. Returning",
    //                             event.origin,
    //                             expectedOrigin
    //                         );
    //                         return;
    //                     }

    //                     if (event.data.code != null) {
    //                         this.data.code = event.data.code;
    //                         this.$store.commit("SET_AUTH_BEARER", event.data.code);
    //                         // this.$router.push("user");
    //                     }
    //                 },
    //                 false
    //             );
    //             this.hasListener = true;
    //         }
    //     },
    },

    // watch: {
    //     "$route.query": {
    //         handler: function (newValue) {
    //             this.getParams();
    //         },
    //         deep: true,
    //     },
    // },
};
</script>

<style></style>
