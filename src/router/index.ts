import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home.vue"

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
        path: "/",
        name: "HomeRaw",
        component: Home,
    },
    {
        path: "/:page",
        name: "HomePage",
        component: Home,
    },
    {
        path: "/:page/:minigame",
        name: "HomePageMinigame",
        component: Home,
    },
    {
        path: "/:page/:minigame/:mapname",
        name: "HomeFull",
        component: Home,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "HomeCatchAll",
        component: Home,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


export default router