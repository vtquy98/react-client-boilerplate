import React from "react";

class EmptyPageLayout extends React.Component {
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default EmptyPageLayout;
