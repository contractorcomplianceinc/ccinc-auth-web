const authStore = {
    state: {
        token: null
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
        AUTHENTICATE: ({dispatch, commit}, data) => {
            let path = "v2.0/auth/authenticate";

            return dispatch("_POST", {
                path,
                params: data
            })
            .then(res => {
                commit("SET_AUTH_BEARER", res.data);
                return res;
            }); 
        },
        AUTHORIZE: ({dispatch}, data) =>{
            let path = "oauth/authorize";

            return dispatch("_POST", {
                path,
                params: data
            })
            .then(res => {
                return res;
            }); 
        }
    },
    mutations: {
       
    },
};

export default authStore;
