import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Loading from "@/components/Loading";
import { PATH_CONSTANTS } from "@/constants/path";

const LoginPage = lazy(() => import("@/pages/Login"));
const AuthRouter = lazy(() => import("./AuthRouter"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path={PATH_CONSTANTS.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<AuthRouter />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
