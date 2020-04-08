import Vue from "vue";
import Router from "vue-router";
import HelloPage from "src/layout/pages/hello-page";

Vue.use(Router);

const routes = [
    {
        path: "/",
        redirect: "/hello",
    },
    {
        path: "/hello",
        name: "hello",
        component: HelloPage,
    },
];

const router = new Router({
    mode: "history",
    routes,
});

// 导出路由
export default router;
