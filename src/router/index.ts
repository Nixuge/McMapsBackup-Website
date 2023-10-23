import { createWebHistory, createRouter } from "vue-router"
import Root from "@/views/Root.vue"

const ServerLazy = () => import("@/views/Server.vue");

const routes = [
    {
        path: "/api",
        name: "Api",
        component: () => import("@/views/Api.vue"),
    },
    {
        path: "/help",
        name: "Help",
        component: () => import("@/views/Help.vue"),
    },
    {
        path: "/dmca",
        name: "DMCA",
        component: () => import("@/views/Dmca.vue"),
    },
    {
        path: "/contribute",
        name: "Contribute",
        component: () => import("@/views/Contribute.vue"),
    },
    {
        path: "/",
        name: "Root",
        component: Root,
    },
    {
        path: "/:server",
        name: "Server",
        component: ServerLazy,
    },
    {
        path: "/:server/:page",
        name: "ServerPage",
        component: ServerLazy,
    },
    {
        path: "/:server/:page/:minigame",
        name: "ServerMinigame",
        component: ServerLazy,
    },
    {
        path: "/:server/:page/:minigame/:mapname",
        name: "ServerFull",
        component: ServerLazy,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "RootCatchAll",
        component: Root,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});


export default router