<template>
    <div>
        <h1>Responses</h1>
        <v-data-table :headers="headers" :items="$store.getters.responses" :items-per-page="10" class="elevation-1">
        </v-data-table>
        <!-- <p v-for="(response, index) in $store.getters.responses" :key="index">
                {{ response }}
            </p> -->
    </div>
</template>

<script>
export default {
    data: () => ({
        headers: [
            {
                text: "URL",
                value: "url",
            },
            {
                text: "Request Budy",
                value: "response.config.data",
            },
            {
                text: "Status",
                value: "response.status",
            },
            {
                text: "Response",
                value: "response.data",
            },
        ],
    }),
};
</script>

<style></style>
