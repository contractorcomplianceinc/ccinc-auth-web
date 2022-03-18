<template>
    <div>
        <h1>Login</h1>

        <p>
            {{error}}
        </p>

        <v-text-field label="E-Mail" v-model="credentials.email"></v-text-field>
        <v-text-field label="Password" v-model="credentials.password" type="password"></v-text-field>
        <v-btn @click="submit()"> Submit </v-btn>


        <v-snackbar v-model="showError" color="red">
            {{ error }}
        </v-snackbar>
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
            showError: false,
            error: null,
        };
    },
    methods: {
        submit: function () {
            this.$store.dispatch("AUTHENTICATE", this.credentials)
            .then(res => {
                this.$router.push({ path: '/authorize'  });
            })
            .catch((error) => {
                console.error(error.response);
                this.error = error.response.data.message;
                this.showError = true;
            });
        },
    },
};
</script>

<style></style>
