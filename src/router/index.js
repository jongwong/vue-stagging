import Vue from "vue";
import Router from "vue-router";
import HelloPage from "src/layout/pages/hello-page";

Vue.use(Router); // 在vue中注入Router

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "login",
        component: HelloPage,
    },
];

// 将路径注入到Router中
var router = new Router({
    mode: "history",
    routes,
});

const isLogin = () => Boolean(localStorage.getItem("token"));
router.beforeEach((to, from, next) => {
    if (to.matched.some((item) => item.meta.requireAuth)) {
        if (!isLogin()) {
            next({
                path: "/",
                replace: true,
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
// 导出路由
export default router;
