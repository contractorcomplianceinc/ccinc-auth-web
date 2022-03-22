<template>
    <div>
        <h1>Authorize</h1>

        <v-btn @click="authorize()"> Auth </v-btn>

        <v-btn @click="getParams()"> Params </v-btn>

    <v-btn @click="getToken()">Get Token</v-btn>

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
            data: {},
        };
    },
    methods: {
        authorize() {
            this.$store.dispatch("OAUTH_AUTHORIZE");
        },
        getParams() {
            console.debug("getParams", this.$route.query);
            let code = this.$route.query.code;
            this.data = {
                ...this.data,
                code: code
            };
        },
        getToken(){
            this.$store.dispatch("OAUTH_TOKEN_CODE", this.data.code)
                .then(res => {
                    this.data = {
                        ...this.data,
                        token: res.data.access_token
                    }
                });
        }
    },
    mounted() {
        this.getParams();
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
