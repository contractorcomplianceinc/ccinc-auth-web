const authStore = {
    state: {
        token: null,
    },
    getters: {},
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
            }).then((res) => {
                commit("SET_AUTH_BEARER", res.data);
                return res;
            });
        },
        OAUTH_AUTHORIZE: ({ dispatch }) => {
            let path = "oauth/authorize";
            return dispatch("_GET", {
                path: path,
                params: {
                    client_id: process.env.VUE_APP_API_CLIENT_ID,
                    redirect_uri: process.envVUE_APP_API_CLIENT_REDIRECT,
                    response_type: "code",
                    scope: "*",
                    state: "state",
                },
            }).then((res) => {
                console.log("/oauth/authorize", res);
                return res;
            });
        },
        OAUTH_TOKEN: ({ dispatch }) => {
            let path = "oauth/token";
            return dispatch("_POST", {
                path: path,
                params: {
                    client_secret: process.env.VUE_APP_API_CLIENT_SECRET,
                    client_id: process.env.VUE_APP_API_CLIENT_ID,
                    grant_type: "client_credentials",
                    scope: ""
                    // redirect_uri: process.env("VUE_APP_API_CLIENT_REDIRECT"),
                    // response_type: "code",
                    // state: "state",
                },
            }).then((res) => {
                console.log("/oauth/token", res);
                return res;
            });
        },
    },
    mutations: {},
};

export default authStore;
