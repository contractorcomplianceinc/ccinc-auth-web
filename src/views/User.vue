<template>
    <div>
        <h1>User Information</h1>
        <v-btn @click="getUser()">
            Get User
        </v-btn>
        <div v-if="user"> 
            <v-card>
                <v-card-title>
                    User {{user.id}}
                </v-card-title>
                <v-card-text>
                    {{user.first_name}} {{user.last_name}}
                </v-card-text>
                <v-card-text>
                    {{user.email}}
                </v-card-text>
                <v-card-text>
                    {{user}}
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user: null
        }
    },
    methods: {
        getUser(){
            this.$store.dispatch("_GET", {
                path: "v2.0/api/users/current"
            })
            .then(res => {
                this.user = res.data;
            })
        }
    }
};
</script>

<style></style>
