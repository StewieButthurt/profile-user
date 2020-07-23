<template>
    <v-app id="authorization">
        <v-main>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col>
                        <v-fade-transition>
                            <app-alert 
                                v-if="alert.status"
                                :text="alert.text"
                                :dense="alert.dense"
                                :type="alert.type"
                                :transition="alert.transition"
                            />
                        </v-fade-transition>
                        <v-card class="authorization__card mt-2">
                            <v-toolbar
                            color="#272727"
                            dark
                            flat
                            >
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    
                                    <v-text-field
                                        label="Login"
                                        name="login"
                                        prepend-icon="mdi-account"
                                        type="text"
                                        autocomplete="new-password"
                                        v-model="login.value"
                                        :error-messages="login.message"
                                        :error="login.error"
                                        @input="inputLogin()"
                                        @keyup.enter="loginAuth"
                                    />

                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        autocomplete="new-password"
                                        name="password"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                        v-model="password.value"
                                        :error-messages="password.message"
                                        :error="password.error"
                                        @input="inputPassword()"
                                        @keyup.enter="loginAuth"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    color="#272727" 
                                    dark
                                    :loading="loading"
                                    :disabled="!(disabledButtonLogin === true && 
                                        disabledButtonPassword === true)"
                                    @click="loginAuth()"
                                    >
                                    Login
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

    import isEmpty from 'validator/lib/isEmpty'
	import isAlphanumeric from 'validator/lib/isAlphanumeric'
    import isByteLength from 'validator/lib/isByteLength'
    const AppAlert = () => import('~/components/login-alert.vue')

    export default {
        layout: 'login',
        head: {
            title: 'Авторизация'
        },
        components: {
            AppAlert
        },
        data() {
            return {
                login: {
                    value: '',
                    message: '',
                    error: null,
                    size: { min: 3, max: 16 },
                    validate: false
                },
                password: {
                    value: '',
                    message: '',
                    error: null,
                    size: { min: 3, max: 24 },
                    validate: false
                },
                loading: false,
                alert: {
                    status: false,
                    text: null,
                    dense: true,
                    type: null,
                    transition: null
                }
            }
        },
        computed: {
            disabledButtonLogin() {
                if(this.login.value !== '' && this.login.validate === true) {
                    return true
                } else {
                    return false
                }
            },
            disabledButtonPassword() {
                if(this.password.value !== '' && this.password.validate === true) {
                    return true
                } else {
                    return false
                }
            },
            message() {
              return this.$route.query
            }
        },
        watch: {
            message(val) {
                if(val.message === 'login') {

                    this.$store.dispatch('modules/auth/logout')
                    this.alert.text = 'Авторизуйтесь чтобы начать'
                    this.alert.type = 'info'
                    this.alert.transition = 'scale-transition'
                    this.alert.status = true

                }
            }
        },
        methods: {
            async inputLogin() {
                
                if(!isEmpty(this.login.value)) {

                    this.login.error = null,
                    this.login.message = ''

                    if(isAlphanumeric(this.login.value)) {

                        this.login.error = null,
                        this.login.message = ''

                        if(isByteLength(this.login.value, this.login.size)) {
                            this.login.error = false
                            this.login.message = ''
                            this.login.validate = true
                        } else {
                            this.login.message = '* Логин должно быть от 3х до 16ти символов'
                            this.login.error = true
                            this.login.validate = false
                        }
                    } else {
                        this.login.message = '* Логин должен содержать только буквы и цифры в латинском алфавите'
                        this.login.error = true
                        this.login.validate = false
                    }
                } else {
                    this.login.message = '* Введите логин'
                    this.login.error = true
                    this.login.validate = false
                }
            },
            async inputPassword() {

              if(!isEmpty(this.password.value)) {

                this.password.error = null
                this.password.message = ''

                if(isAlphanumeric(this.password.value)) {

                  this.password.error = null
                  this.password.message = ''

                  if(isByteLength(this.password.value, this.password.size)) {

                    this.password.error = false
                    this.password.message = ''
                    this.password.validate = true

                  } else {
                      
                    this.password.message = '* Пароль должен быть не менее 3 символов и не более 24'
                    this.password.error = true
                    this.password.validate = false

                  }
                } else {

                  this.password.message = '* Пароль должен содержать только буквы и цифры в латинском алфавите'
                  this.password.error = true
                  this.password.validate = false

                }
              } else {

                this.password.message = '* Введите пароль'
                this.password.error = true
                this.password.validate = false

              }
            },
            async loginAuth() {

              if(this.disabledButtonLogin && this.disabledButtonPassword) {

                this.loading = true

                try {
                    this.alert.status = false
                    const { token } = await this.$axios.$post('/api/auth/', {
                        login: this.login.value,
                        password: this.password.value
                    })
                    await this.$store.dispatch('modules/auth/setToken', token)
                    this.loading = false
                    this.$router.push('/')
                } catch (e) {
                    if(e.response) {
                        if (e.response.status === 429) {

                            this.$store.dispatch('modules/auth/logout')
                            this.alert.text = `Слишком много попыток 
                            авторизации, попробуйте вновь через 10 секунд`
                            this.alert.type = 'error'
                            this.alert.transition = 'scale-transition'
                            this.alert.status = true

                        } else if (e.response.status === 402) {
                            console.log('error 402')
                            this.$store.dispatch('modules/auth/logout')
                            this.alert.text = 'Введеные данные неверные'
                            this.alert.type = 'error'
                            this.alert.transition = 'scale-transition'
                            this.alert.status = true

                        }
                    }
                    this.loading = false
                  }
              }
            }
        }
    }
</script>

<style lang="sass">
    #authorization .authorization__card
        width: 400px
        +xs-block
            width: 300px
</style>