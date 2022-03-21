<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <h1>Alternative Frontend</h1>
            </div>

            <v-spacer></v-spacer>

            <!-- Stuff after -->
            <v-btn to="/"> Home </v-btn>

            <v-btn to="/login"> Login </v-btn>
        </v-app-bar>

        <v-main>
            <v-btn @click="currentUser()"> Current User Info </v-btn>

            <v-btn @click="$store.dispatch('OAUTH_AUTHORIZE')">Authorize</v-btn>

            <v-btn @click="oauthToken()">OAuth Token</v-btn>

            <router-view />

            <h1>Responses</h1>
            <p v-for="(response, index) in $store.getters.responses" :key="index">
                {{ response }}
            </p>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",

    data: () => ({
        //
    }),

    methods: {
        currentUser() {
            return this.$store.dispatch("_GET", "v2.0/users/current");
        },
        oauthToken()
        {
            this.$store.dispatch('OAUTH_TOKEN')
                .then(res => {
                    console.log(res);
                });
        }
    },
};
</script>
