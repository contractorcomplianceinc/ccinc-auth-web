<template>
  <div>
      <h1>
          Authorize
      </h1>

      <v-btn @click="authorize()">
          Auth
      </v-btn>
  </div>
</template>

<script>
export default {
    methods: {
        authorize(){
            this.$store.dispatch("AUTHORIZE");
        }
    }
}
</script>

<style>

</style>