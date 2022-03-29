import axios from "axios";
import _ from "lodash";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

var CC = {
    /**
     * The ID of the element that will hold the iFrame
     */
    iFrameElementId: "callback-iframe",
    callbackElementId: "callback",

    clientId: null,
    clientSecret: null,
    redirectUrl: "http://localhost:8081/#/callback",
    apiUrl: "https://api.contractorcompliance.io",
    code: null,

    // ===== Auth Page ===== //

    /**
     * Creates the iFrame and listeners
     *
     * @param {string} clientId
     * @param {string} clientRedirectUrl
     * @param {string} apiUrl
     */
    injectAuth: function (clientId, clientSecret, clientRedirectUrl, apiUrl = "https://api.contractorcompliance.io/") {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUrl = clientRedirectUrl;
        this.apiUrl = apiUrl;

        // Create iFrame
        this.injectAuthFrame(clientId, clientRedirectUrl, apiUrl);

        // Create listeners
        this.registerListenerGetCode();
    },

    /**
     * Injects the iframe
     * @param {*} clientId
     * @param {*} clientRedirectUrl
     * @param {*} apiUrl
     */
    injectAuthFrame: function (clientId, clientRedirectUrl, apiUrl) {
        let element = document.getElementById(this.iFrameElementId);

        if (!element) {
            console.warn("An element with the id '" + this.iFrameElementId + "' is needed");
            throw new Error("Element '" + this.iFrameElementId + "' not found");
        }

        let iframe = document.createElement("iframe");
        iframe.src = this.authorizeUrl(clientId, clientRedirectUrl, apiUrl);
        iframe.style = "width:100%; height:100%";
        iframe.onload = this.postMessageGetCode();
        element.appendChild(iframe);
    },

    /**
     * Generates the authorize URL
     */
    authorizeUrl: function (clientId, clientRedirectUrl, apiUrl) {
        let path = "oauth/authorize";

        let params = {
            client_id: clientId,
            redirect_uri: clientRedirectUrl,
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

        let url = apiUrl + path + "?" + urlParams;

        return url;
    },

    postMessageGetCode: function () {
        console.log("postMessageGetCode()");
        try {
            var popup = window.frames[0];
            var targetUrl = "http://localhost:8081";

            popup.postMessage("get-code", targetUrl);
        } catch (e) {
            console.warn("Couldn't send get-code cmd", e);
        }
    },

    registerListenerGetCode: function () {
        window.addEventListener(
            "message",
            (event) => {
                // Do we trust the sender of this message?
                if (event.origin !== parent.origin) {
                    // console.debug("event.origin did not match expected source", {
                    //     "event origin": event.origin,
                    //     "expected origin": parent.origin,
                    // });
                    return;
                }

                if (event.data.code != null) {
                    this.code = event.data.code;
                    this.apiGetToken();
                }
            },
            false
        );
    },

    // ===== Callback Page ===== //

    injectCallback: function (clientId, clientRedirectUrl, apiUrl = "https://api.contractorcompliance.io/") {
        this.injectCallbackListener();
    },

    /**
     * Creates a script element with the callback listener
     */
    injectCallbackListener: function () {
        let element = document.getElementById(this.callbackElementId);

        if (!element) {
            console.warn("An element with the id '" + this.callbackElementId + "' is needed");
            throw new Error("Element '" + this.callbackElementId + "' not found");
        }

        var script = document.createElement("script");
        script.innerHTML = this.registerListenerPostCode();
        element.appendChild(script);
    },

    /**
     * Registers a listener that emits a postMessage with the code when triggered
     */
    registerListenerPostCode: function () {
        if (!this.hasListener) {
            window.addEventListener(
                "message",
                (event) => {
                    // Do we trust the sender of this message?
                    if (event.origin !== parent.origin) {
                        console.debug("event.origin did not match expected source", {
                            "event origin": event.origin,
                            "expected origin": parent.origin,
                        });
                        return;
                    }

                    this.messageEvent = event;
                    this.postMessageCode();
                },
                false
            );
            this.hasListener = true;
        }
    },

    /**
     * send postMessage with code
     */
    postMessageCode: _.debounce(
        function () {
            this.getCodeFromUrl();

            if (this.code && this.messageEvent && this.messageEvent.data == "get-code") {
                // console.log("callback source.postMessage", this.code, this.messageEvent.data);
                this.messageEvent.source.postMessage({ code: this.code }, this.messageEvent.origin);
            } else {
                // console.debug("sendPostMessage not sending", {
                //     "is code set": this.code != null,
                //     "messageEvent set": this.messageEvent != null,
                //     "message is get-code": this.messageEvent ? this.messageEvent.data == "get-code" : null,
                // });
            }
        },
        1000,
        {
            leading: true,
            trailing: false,
        }
    ),

    getCodeFromUrl: function () {
        let url = window.location.href;
        let urlParamIndex = url.indexOf("?");
        let urlParamStr = url.substring(urlParamIndex + 1);
        let params = urlParamStr.split("&").map((paramStr) => {
            let param = paramStr.split("=");
            return {
                key: param[0],
                val: param[1],
            };
        });

        this.code = params.find((p) => p.key == "code").val;

        return this.code;
    },

    // ===== API ===== //

    apiGetToken: function () {
        let path = "oauth/token";
        let url = this.apiUrl + path;
        let params = {
            grant_type: "authorization_code",
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUrl,
            code: this.code,
        };

        if (this.code && this.clientId && this.clientSecret && this.redirectUrl) {
            return axios.post(url, params).then((res) => {
                let token = res.data.access_token;
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                axios.defaults.headers.common["X-XSRF-TOKEN"] = token;
                return token;
            });
        } else {
            // console.warn("apiGetToken: Missing Parameter", params);
        }
    },
};

export default CC;
