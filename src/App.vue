<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <h1>Alternative Frontend</h1>
            </div>

            <v-spacer></v-spacer>

            <!-- Stuff after -->
            <v-btn to="/">
                Home
            </v-btn>
 
            <v-btn to="/login">
                Login
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",

    data: () => ({
        //
    }),

    mounted(){
        // this.$store.dispatch("GET_CSRF");
    }
};
</script>
