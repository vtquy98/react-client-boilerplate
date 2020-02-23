import React from "react";
import DashboardPageComponent from "../components/DashboardPageComponent";
import EmptyPageLayout from "../layouts/EmptyPageLayout";
import AuthenHOC from "../components/AuthenHOC";
const DashboardPage = rootProps => (
  <EmptyPageLayout {...rootProps} title="not config">
    <DashboardPageComponent {...rootProps} />
  </EmptyPageLayout>
);

export default AuthenHOC(DashboardPage);
