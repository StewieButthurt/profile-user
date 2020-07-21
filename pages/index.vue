<template>
  <div class="profile">
        <v-card class="profile__card-image">
            <div class="profile-user__img">
              <v-img class="mt-5 ml-5 mr-5 mb-5" :src="img" />
            </div>
        </v-card>
        <v-card class="profile__card-descr">
          <v-card-text class="text-h5 font-weight-medium text--primary col-10 text-truncate">
            <div class="text-truncate">Имя Фамилия</div>
          </v-card-text>
        </v-card>
    </div>
</template>

<script>

export default {
  head: {
    title: 'Мой профиль'
  },
  data() {
    return {
      profile: {

      }
    }
  },
  computed: {
    img() {
      return require('~/assets/' + 'face.jpg')
    }
  }
}
</script>

<style lang="sass">
  .profile
    display: flex
    +xs-block
      flex-direction: column

  .profile__card-image,
  .profile__card-descr
    margin: 0px 15px 15px 15px

  .profile__card-descr
    flex-grow: 1
    display: flex
    
  .profile-user__img
    width: 300px
    +xs-block
      width: 100%
</style>

