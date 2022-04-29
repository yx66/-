import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import { PATH_CONSTANTS } from "@/constants/path";

const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const allPage = {
  TestOne: lazy(() => import("@/pages/TestOne")),
  基本设置: lazy(() => import("@/pages/website/BasicSettings")),
  站点设置: lazy(() => import("@/pages/SiteManagement/index")),
  PageManagement: lazy(() => import("@/pages/grapesJs/home/home")),
  PageEditing: lazy(() => import("@/pages/grapesJs/editor/editor")),
  Tempale: lazy(() => import('@/pages/grapesJs/template/template')),
	TempalePage: lazy(() => import('@/pages/grapesJs/tempalePage/tempalePage')),
  SEO设置: lazy(() => import("@/pages/website/SEOSettings/index")),
  栏目管理: lazy(() => import("@/pages/website/columumanage/index")),
};


function renderRoute(routes = []) {
  return routes.reduce((prev, next) => {
    const Element = allPage[next.key];
    if (Element && Array.isArray(next.routes)) {
      prev.push(
        <Route key={next.path} path={next.path} element={<Element />}>
          {renderRoute(next.routes)}
        </Route>
      );
    } else if (Element) {
      prev.push(
        <Route key={next.path} path={next.path} element={<Element />} />
      );
    } else if (
      Array.isArray(next.routes) &&
      next.routes[0] &&
      next.routes[0].path
    ) {
      prev.push(
        <Route
          key={next.path}
          path={next.path}
          element={<Navigate to={next.routes[0].path} />}
        />,
        ...renderRoute(next.routes)
      );
    } else {
      prev.push(
        <Route
          key={next.path}
          path={next.path}
          element={<Navigate to={PATH_CONSTANTS.NOT_FOUND} />}
        />
      );
    }

    return prev;
  }, []);
}

function AuthedRouter() {
  const routes = useSelector((state) => state.app.routes)?.[0]?.routes;

  if (Array.isArray(routes) && routes.length) {
    // console.log(routes, renderRoute(routes));
    return (
      <Routes>
        {renderRoute(routes)}
        <Route path={PATH_CONSTANTS.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={PATH_CONSTANTS.NOT_FOUND} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={PATH_CONSTANTS.NOT_FOUND} />} />
    </Routes>
  );
}

function AuthRouter() {
  const token = useSelector((state) => state.app.token);
  return token ? (
    <MainLayout>
      <AuthedRouter />
    </MainLayout>
  ) : (
    <Navigate to={PATH_CONSTANTS.LOGIN} />
  );
}

export default AuthRouter
