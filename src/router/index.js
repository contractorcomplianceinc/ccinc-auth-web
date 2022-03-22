import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },
    {
        path: "/authorize",
        name: "Authorize",
        component: () => import(/* webpackChunkName: "authorize" */ "../views/Authorize.vue"),
    },
    {
        path: "/callback",
        name: "callback",
        component: () => import(/* webpackChunkName: "callback" */ "../views/Callback.vue"),
    },
    {
        path: "/user",
        name: "User",
        component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
