import Vuex from "vuex";

// модуль авторизации
import auth from "./modules/auth";

// модуль профиля пользователя
import profile from "./modules/profile"

const store = new Vuex.Store({
    modules: {
        auth,
        profile
    }
})