import { createWebHistory, createRouter } from "vue-router"
import Root from "@/views/Root.vue"
import Server from "@/views/Server.vue"

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
        component: Server,
    },
    {
        path: "/:server/:page",
        name: "ServerPage",
        component: Server,
    },
    {
        path: "/:server/:page/:minigame",
        name: "ServerMinigame",
        component: Server,
    },
    {
        path: "/:server/:page/:minigame/:mapname",
        name: "ServerFull",
        component: Server,
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