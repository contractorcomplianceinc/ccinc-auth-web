
import axios from "axios";
import _ from "lodash";

var CCCallback = {
    elementId: "callback",
    code: null,

    inject: function () {
        this.getCode();
        let element = document.getElementById(this.elementId);

        if (!element) {
            console.warn("An element with the id '" + this.elementId + "' is needed");
            throw new Error("Element '" + this.elementId + "' not found");
        }

        var script = document.createElement("script");
        script.innerHTML = this.registerListener();
        element.appendChild(script);
    },

    getCode: function () {
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

    registerListener: function () {
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
            if (this.code && this.messageEvent && this.messageEvent.data == "get-code") {
                console.log("callback source.postMessage", this.code, this.messageEvent.data);
                this.messageEvent.source.postMessage(this.code, this.messageEvent.origin);
            } else {
                console.debug("sendPostMessage not sending", {
                    "is code set": this.code != null,
                    "messageEvent set": this.messageEvent != null,
                    "message is get-code": this.messageEvent ? this.messageEvent.data == "get-code" : null,
                });
            }
        },
        1000,
        {
            leading: true,
            trailing: false,
        }
    ),

    url: function(clientId, clientRedirectUrl, apiUrl = "https://api.local.contractorcompliance.io/"){
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
    }
};
export default CCCallback;