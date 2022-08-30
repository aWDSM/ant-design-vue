import Layout from "@/layout/index.vue";

const lazyComponent = (name) => () =>
  import(/* webpackChunkName: "[request]" */ `@/views/${name}.vue`);

/**
 * @type { RouteConfig[] }
 */
const routes = [
  {
    path: "/login",
    name: "Login",
    component: lazyComponent("Login/index"),
  },
  {
    path: "/",
    name: "Layout",
    redirect: "/tenant",
    component: Layout,
    children: [
      {
        path: "tenant",
        name: "Tenant",
        component: lazyComponent("Tenant/index"),
        meta: { title: "租户管理", icon: "ic-tenant" },
      },
      {
        path: "tenant/:id",
        name: "TenantDetail",
        component: lazyComponent("Tenant/detail"),
        meta: { active: "Tenant", custom: true },
      },
      {
        path: "log",
        name: "Log",
        component: lazyComponent("Log/index"),
        meta: { title: "操作日志", icon: "ic-log" },
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

export default routes;
