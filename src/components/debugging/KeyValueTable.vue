<template>
    <div>
        {{ this.items }}
        <v-data-table :headers="headers" :items="data" class="elevation-1"> </v-data-table>
    </div>
</template>

<script>
export default {
    props: ["items"],
    data() {
        return {
            headers: [
                {
                    text: "Key",
                    value: "key",
                },
                {
                    text: "Value",
                    value: "value",
                },
            ],
        };
    },
    computed: {
        data: function () {
            return Object.keys(this.items).map((key) => {
                return {
                    key: key,
                    value: this.items[key],
                };
            });
        },
    },
};
</script>

<style></style>
