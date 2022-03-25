<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <h1>Alternative Frontend</h1>
            </div>

            <v-spacer></v-spacer>

            <!-- Stuff after -->
            <v-btn to="/"> Home </v-btn>

            <!-- <v-btn to="/login"> Login </v-btn> -->

            <v-btn to="/authorize"> Authorize </v-btn>

            <v-btn to="/user"> User </v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",

    components: {
    },

    data: () => ({
        //
    }),

    methods: {
        currentUser() {
            return this.$store.dispatch("_GET", {
                path: "v2.0/users/current"
            });
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
