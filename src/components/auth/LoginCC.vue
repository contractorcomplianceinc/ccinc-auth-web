<template>
    <div>
        <h1>Login</h1>
        <v-text-field label="E-Mail" v-model="credentials.email"></v-text-field>
        <v-text-field label="Password" v-model="credentials.password" type="password"></v-text-field>
        <v-btn @click="submit()"> Submit </v-btn>

        {{$store.getters.responses}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            credentials: {
                // email: null,
                // password: null,
                email: "owner1@hiring-org.ca",
                password: "password",
            },
        };
    },
    methods: {
        submit: function(){
           this.$store.dispatch("AUTHENTICATE", this.credentials);
        }
    }
};
</script>

<style></style>
