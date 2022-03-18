/**
 * Template Store
 * templateStore.js
 *
 * Andrew Lampert
 * 27 May 2020
 *
 * This was written to help speed up setting up additional stores where needed.
 * This store is not to be included in the vuex.js file, but the stores created from this file can be.
 *
 * In order to import the store, import this file into vuex.js, and add the import to Vuex.Store({ modules: { ... } })
 */
// import Vue from "vue";
import axios from "axios";
import httpService from "@/services/httpService";

const httpStore = {
    state: {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        responses: {
            get: [],
            post: [],
        },
    },
    getters: {
        responses: (state) => {
            return state.responses;
        },
    },
    // Use `dispatch` to run these items
    actions: {
        _GET: ({ state, commit }, path, params) => {
            let url = process.env.VUE_APP_ROOT_API + path;

            return new Promise((resolve) => {
                httpService.get(path)
                    .then(res => {
                        resolve(res);
                    });
            });

            // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

            // return axios
            //     .get(url, {
            //         headers: state.headers,
            //         params: params,
            //     })
            //     .then((res) => {
            //         commit("RECORD_RESPONSE", {
            //             method: "get",
            //             url,
            //             params,
            //             response: res,
            //         });
            //     });
        },
        _POST: ({ state, commit }, path, params) => {
            let url = process.env.VUE_APP_ROOT_API + path;

            return axios
                .post(url, {
                    // headers: state.headers,
                    params: params,
                })
                .then((res) => {
                    commit("RECORD_RESPONSE", {
                        method: "post",
                        url,
                        params,
                        response: res,
                    });
                    return res;
                });
        },
    },
    mutations: {
        RECORD_RESPONSE: (state, data) => {
            state.responses[data.method].push({
                url: data.url,
                response: data.response,
            });
        },
    },
};

export default httpStore;
