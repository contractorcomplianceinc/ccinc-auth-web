import axios from "axios";
import _ from "lodash";
import CCCallback from "./CCCallback";

var CC = {
    origin: "http://localhost:8081",

    hasListener: false,
    feedbackElement: null,

    init: function (data) {
        this.origin = data.origin;
    },

    createCallbackPage: function () {
        this.callback.inject();
    },
    createCallbackIframe: function () {
        this.authorize.inject();
    },

    authorize: {
        elementId: "callback-iframe",

        inject: function() {
            let element = document.getElementById(this.elementId);

            if (!element) {
                console.warn("An element with the id '" + this.elementId + "' is needed");
                throw new Error("Element '" + this.elementId + "' not found");
            }

            var iframe = document.createElement("iframe");
            iframe.src = CCCallback.url();
            element.appendChild(iframe);
        },

        getCodeFromCallbackIFrame: function () {},
    },

   

    // /**
    //  * Generates the URL required to obtain the authorization code
    //  *
    //  * @param {string} client_id
    //  * @param {string} redirect_uri
    //  * @param {string} base_url
    //  * @returns Authorize URL
    //  */
    // authorizeURL: function (client_id, redirect_uri, base_url = "https://api.contractorcompliance.io/") {
    //     let path = "oauth/authorize";

    //     let params = {
    //         client_id: client_id,
    //         redirect_uri: redirect_uri,
    //         response_type: "code",
    //         scope: "*",
    //         state: "state",
    //     };

    //     let urlParams = Object.keys(params)
    //         .map((key, index) => {
    //             let val = params[key];
    //             return key + "=" + encodeURIComponent(val);
    //         })
    //         .join("&");

    //     let url = base_uri + path + "?" + urlParams;

    //     return url;
    // },

    // token: ({ dispatch }) => {
    //     let path = "oauth/token";
    //     return dispatch("_POST", {
    //         path: path,
    //         params: {
    //             client_secret: process.env.VUE_APP_API_CLIENT_SECRET,
    //             client_id: process.env.VUE_APP_API_CLIENT_ID,
    //             grant_type: "client_credentials",
    //             scope: "",
    //         },
    //     }).then((res) => {
    //         console.log("/oauth/token", res);
    //         return res;
    //     });
    // },
};

export default CC;
