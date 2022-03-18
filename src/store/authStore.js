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

const authStore = {
    state: {},
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
        AUTHENTICATE: ({dispatch}, data) => {
            let path = "v2.0/api/authenticate";

            return dispatch("_POST", path, data); 
        }
    },
    mutations: {},
};

export default authStore;
