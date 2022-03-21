import axios from "axios";
import httpService from "@/services/httpService";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const httpStore = {
    state: {
        responses: [],
    },
    getters: {
        responses: (state) => {
            return state.responses;
        },
    },
    // Use `dispatch` to run these items
    actions: {
        _GET: ({ state, commit }, data) => {
            let path = data.path;
            let params = data.params;

            let url = process.env.VUE_APP_ROOT_API + path;

            return axios.get(url, {
                // headers: headers,
                params: params,
            });
        },
        _POST: ({ state, commit }, data) => {
            let path = data.path;
            let params = data.params;
            let url = process.env.VUE_APP_ROOT_API + path;

            return axios.post(url, params).then((res) => {
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
            state.responses.push({
                url: data.url,
                response: data.response,
            });
        },
        SET_AUTH_BEARER: (state, token) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            console.log("axios headers", axios.defaults.headers.common);
        },
    },
};

export default httpStore;
