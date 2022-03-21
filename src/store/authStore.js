const authStore = {
    state: {
        authenticated: false,
    },
    getters: {
        isAuthenticated: (state) => {
            return state.authenticated;
        },
    },
    mutations: {
        SET_AUTHENTICATED: (state, value) => {
            state.authenticated = value;
        },
    },
    actions: {
        /**
         * Gets the CSRF Token from the server
         * Before you can get any information from the server, you need to dispatch this action
         * This will load the CSRF token into the cookies
         */
        GET_CSRF: ({ dispatch }) => {
            let path = "sanctum/csrf-cookie";

            return dispatch("_GET", path);

            // return new Promise((resolve, reject) => {
            //     httpService
            //         .get(requestPath)
            //         .then((response) => {
            //             resolve(getters.sanctumGetCsrfToken);
            //         })
            //         .catch((err) => {
            //             commit("COMMON_ERROR", err);
            //             reject(err);
            //         });
            // });
        },
        AUTHENTICATE: ({ dispatch, commit }, data) => {
            let path = "v2.0/auth/authenticate";

            return dispatch("_POST", {
                path,
                params: data,
                maxRedirects: 0,
            }).then((res) => {
                commit("SET_AUTH_BEARER", res.data);
                commit("SET_AUTHENTICATED", true);
                return res;
            });
        },
        OAUTH_AUTHORIZE: ({ dispatch }) => {
            let path = "oauth/authorize";

            let params = {
                client_id: process.env.VUE_APP_API_CLIENT_ID,
                redirect_uri: process.env.VUE_APP_API_CLIENT_REDIRECT,
                response_type: "code",
                scope: "*",
                state: "state",
            };

            let urlParams = Object.keys(params)
                .map((key, index) => {
                    let val = params[key];
                    // console.log(key, val);
                    return key + "=" + encodeURIComponent(val);
                })
                .join("&");

            let url = process.env.VUE_APP_ROOT_API + path + "?" + urlParams;

            window.location = url;

            // return dispatch("_GET", {
            //     path: path,
            //     params: params,
            //     headers: {
            //         Accept: "*/*",
            //     },
            // }).then((res) => {
            //     console.log("/oauth/authorize", res);
            //     return res;
            // })
            // .catch(error => {
            //     console.warn("/oauth/authorize", error, error.request);
            //     return error;
            // });
        },
        OAUTH_TOKEN: ({ dispatch }) => {
            let path = "oauth/token";
            return dispatch("_POST", {
                path: path,
                params: {
                    client_secret: process.env.VUE_APP_API_CLIENT_SECRET,
                    client_id: process.env.VUE_APP_API_CLIENT_ID,
                    grant_type: "client_credentials",
                    scope: "",
                },
            }).then((res) => {
                console.log("/oauth/token", res);
                return res;
            });
        },
        OAUTH_CLIENTS: ({ dispatch }) => {
            let path = "oauth/clients";
            return dispatch("_GET", {
                path: path,
            }).then((res) => {
                console.log("OAUTH_CLIENTS", res);
                return res;
            });
        },
    },
};

export default authStore;
