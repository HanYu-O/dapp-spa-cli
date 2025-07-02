import { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";

const MainLayout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
// MainLayout.whyDidYouRender = true;
export default memo(MainLayout);
