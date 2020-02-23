import React from "react";

const DashboardPageComponent = ({ currentUser }) => (
  <React.Fragment>Hi, {currentUser && currentUser.full_name}</React.Fragment>
);

export default DashboardPageComponent;
