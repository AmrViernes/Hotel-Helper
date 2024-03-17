import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props: any) => (
  <ContentLoader
    speed={1}
    width="100%"
    height={150}
    viewBox="0 0 200 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#cccc"
    {...props}
  >
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
  </ContentLoader>
);

export default Loader;
