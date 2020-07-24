import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'


const state = () => ({
    token: null,
    authStatusError: null
})

const mutations = {
    setToken(state, token) {
        if (token) {
            state.authStatusError = null
        }
        state.token = token
    },
    clearToken(state) {
        state.token = null
    },
    setAuthStatusError(state, error) {
        state.authStatusError = error
    }
}

const actions = {
    // устанавливаем токен
    async setToken({ commit }, token) {
        this.$axios.setToken(token, 'Bearer')
        commit('setToken', token)
        Cookies.set('jwt-token', token)
    },
    // выходим из аккаунта
    async logout({ commit }) {
        this.$axios.setToken(false)
        commit('clearToken')
        Cookies.remove('jwt-token')
    },
    // автологин
    async autoLogin({ dispatch }) {
        const cookieStr = process.browser ?
            document.cookie :
            this.app.context.req.headers.cookie

        const cookies = Cookie.parse(cookieStr || '') || {}
        const token = cookies['jwt-token']

        if (isJWTValid(token)) {
            dispatch('setToken', token)
        } else {
            dispatch('logout')
        }
    }
}

const getters = {
    isAuthenticated: state => Boolean(state.token),
    token: state => state.token,
    authStatusError: state => state.authStatusError
}

// проверяем цикл жизни токена
function isJWTValid(token) {
    if (!token) {
        return false
    }

    const jwtData = jwtDecode(token) || {}
    const expires = jwtData.exp || 0

    return (new Date().getTime() / 1000) < expires
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};