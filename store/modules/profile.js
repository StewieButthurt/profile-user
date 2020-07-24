const state = () => ({
    profile: false
})

const mutations = {
    setProfile(state, profile) {
        state.profile = profile
    }
}

const actions = {
    // записываем данные пользователя
    async setProfile({ commit }, profile) {
        commit('setProfile', profile)
    }
}

const getters = {
    profile: state => state.profile,
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};