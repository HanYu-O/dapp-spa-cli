import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "@/layouts/Layout";
import HomePage from "@/pages/Home";

const Layout = () => {
  return (
    <Suspense>
      <MainLayout />
    </Suspense>
  );
};

const AboutPage = lazy(() => import("@pages/About"));
const mainRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
  ],
};

const routes: RouteObject[] = [mainRoutes];

export default routes;
