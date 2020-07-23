<template>
    <v-alert class="my-v-alert text-center authorization__card" 
        :dense="dense" 
        :type="type" 
        :transition="transition"
        >
    {{text}}
    </v-alert>
</template>

<script>
    export default {
        props: [
            'text',
            'type',
            'dense',
            'transition'
        ]
    }
</script>

<style lang="sass">

    .my-v-alert 
      margin-bottom: 0px

    .my-v-alert .v-alert__wrapper
      justify-content: center
      align-items: center

    .my-v-alert .v-alert__content
      display: block
      flex: none
      width: 80%
</style>