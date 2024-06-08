import type { RouteRecordRaw } from 'vue-router';

import { traverseTreeValues } from '@vben/utils';
import { mergeRouteModules } from '@vben-core/helpers';

import { essentialsRoutes, fallbackNotFoundRoute } from './_essentials';

const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

// 有需要可以自行打开注释，并创建文件夹
// const staticRouteFiles = import.meta.glob('./static/**/*.ts', { eager: true });

/** 动态路由 */
const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

/** 静态路由列表，访问这些页面可以不需要权限 */
// const staticRoutes: RouteRecordRaw[] = mergeRouteModules(staticRouteFiles);
const staticRoutes: RouteRecordRaw[] = [];

/** 路由列表，由基本路由+静态路由组成 */
const routes: RouteRecordRaw[] = [
  ...essentialsRoutes,
  ...staticRoutes,
  fallbackNotFoundRoute,
];

/** 基本路由列表，这些路由不需要进入权限拦截 */
const essentialsRouteNames = traverseTreeValues(
  essentialsRoutes,
  (route) => route.name,
);

export { dynamicRoutes, essentialsRouteNames, routes };
