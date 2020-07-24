<template>
  <div class="profile" id="profile">
        <v-card class="profile__card-image">
          <div class="profile-user__img">
              <v-img  aspect-ratio="1" alt="avatar.jpg" :src="img" />
            </div>
        </v-card>
        <div class="profile__descr">
          <div class="profile__descr-header">
            <div class="profile__descr-name font-weight-medium">
              {{profile.name}}
            </div>
            <div class="profile__descr-button">
              <v-btn outlined >Редактировать</v-btn>
            </div>
          </div>
          <div class="profile__descr-info">
            <div class="profile__descr-info-wrapper mt-4">
              <div class="profile__descr-info-counter font-weight-medium">
                0
              </div>
              <div class="profile__descr-info-text ml-2">
                публикаций
              </div>
            </div>
            <div class="profile__descr-info-email mt-4 font-weight-light">
              {{profile.email}}
            </div>
          </div>
        </div>
  </div>
</template>

<script>

export default {
  async middleware({store, redirect, $axios}) {
    try {
      // проверяем наличие токена
      if(!store.getters['modules/auth/token']) {
          await store.dispatch('modules/auth/autoLogin')
      }
      // отправляем токен на проверку
      const token = await $axios.$get('api/auth/token/')
      // в случае успешной валидации токена
      // возвращаем профиль пользователя
      await store.dispatch('modules/profile/setProfile', token.profile)
    } catch(e) {
      throw e
    }
    
  },
  head: {
    title: 'Мой профиль'
  },
  computed: {
    img() {
      return require('~/assets/' + this.profile.photo)
    },
    profile() {
      return this.$store.getters['modules/profile/profile']
    }
  }
}
</script>

<style lang="sass">
  .profile
    display: flex
    justify-content: center
    margin-top: 20px
    +xs-block
      flex-direction: column
      align-items: center
      justify-content: center
  
  #profile .profile__card-image
    border-radius: 100px
    overflow: hidden
    width: 150px
    min-width: 150px
  
  .profile__descr
    margin-left: 80px
    +xs-block
      margin-left: 0px
  
  .profile__descr-header
    display: flex
    align-items: flex-end
    +xs-block
      margin-top: 25px

  #profile .profile__descr-button .v-btn
    text-transform: inherit
    border: 1px solid #d6d6d6
    height: 30px
    font-size: 13px
    letter-spacing: inherit
    margin-left: 40px

  .profile__descr-info
    display: flex
    flex-direction: column
  
  .profile__descr-info-wrapper
    display: flex
    margin-left: 30px
  
  .profile__descr-info-wrapper:first-child 
    margin-left: 0px
  
 
</style>

