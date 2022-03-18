import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import httpStore from "./httpStore";
import authStore from "./authStore";

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        httpStore: httpStore,
        authStore: authStore,
    },
});
