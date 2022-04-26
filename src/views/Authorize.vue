<template>
    <div>
        <h1>Authorize</h1>

        <v-btn @click="showDialog()"> Click Here to Login with Contractor Compliance </v-btn>

        <v-dialog v-model="showAuthDialog" persistent eager>
            <v-card>
                <v-card-title>
                    <h2>Authorize</h2>
                </v-card-title>
                <div style="height: 30em" id="callback-iframe">
                </div>
                <v-card-actions>
                    <v-btn @click="closeDialog()">Close</v-btn>
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
        };
    },
    methods: {
        showDialog() {
            this.showAuthDialog = true;
            CC.injectAuth(
                process.env.VUE_APP_API_CLIENT_ID,
                process.env.VUE_APP_API_CLIENT_SECRET,
                process.env.VUE_APP_API_CLIENT_REDIRECT,
                "https://api.local.cc.io/"
            );
        },
        closeDialog(){
            CC.postMessageGetCode();
            this.showAuthDialog = false;
        },
    },
};
</script>

<style></style>
