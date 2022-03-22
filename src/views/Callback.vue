<template>
    <div>
        <h1>Callback</h1>
        <p>
            {{ data }}
        </p>
        <v-btn @click="sendPostMessage()">Click</v-btn>
    </div>
</template>

<script>
import _ from "lodash";

export default {
    data: () => ({
        data: null,
        messageEvent: null,
        hasListener: false,
        eventName: "message", // Turns out it has to be "message"
    }),

    mounted() {
        this.data = this.$route.query;
        this.registerListener();
    },

    methods: {
        registerListener() {
            if (!this.hasListener) {
                console.log("Registering message event listener - Callback");
                window.addEventListener(
                    this.eventName,
                    (event) => {
                        let expectedOrigin = "http://localhost:8081";

                        // Do we trust the sender of this message?
                        if (event.origin !== expectedOrigin) {
                            console.debug(
                                "event.origin did not match expected source. Returning",
                                event.origin,
                                expectedOrigin
                            );
                            return;
                        }

                        this.messageEvent = event;
                        this.sendPostMessage();
                    },
                    false
                );
                this.hasListener = true;
            }
        },
        sendPostMessage: _.debounce(
            function () {
                if (this.messageEvent) {
                    if (this.messageEvent.data == "get-code") {
                        let code = this.$route.query.code;
                        if (code) {
                            console.log("callback source.postMessage", this.$route.query, this.messageEvent.data);
                            this.messageEvent.source.postMessage(this.$route.query, this.messageEvent.origin);
                        }
                    }
                } else {
                    console.info("Message Event was null - no messages returned");
                }
            },
            1000,
            {
                leading: true,
                trailing: false,
            }
        ),
    },
};
</script>

<style></style>
