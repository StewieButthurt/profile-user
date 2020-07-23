<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#272727"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Мой профиль</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="white"
            dark
            v-bind="attrs"
            v-on="on"
            @click="clickLogout()"
          >mdi-login-variant</v-icon>
        </template>
        <span>Выйти</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <v-container
        fluid
      >
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      color="#272727"
      app
      dark
    >
      <span class="white--text">Developed by nosoff.slawa@yandex.ru</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
      }
    },
    methods: {
      async clickLogout() {
        await this.$store.dispatch('modules/auth/logout')
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="sass">

</style>

