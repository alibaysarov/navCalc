import React from "react";
import ContentLoader from "react-content-loader"
const Loader = (props) => (
  <ContentLoader 
    speed={2}
    width={340}
    height={600}
    viewBox="0 0 340 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="145" y="199" rx="0" ry="0" width="3" height="0" /> 
    <rect x="122" y="198" rx="0" ry="0" width="0" height="1" /> 
    <rect x="143" y="248" rx="0" ry="0" width="0" height="1" /> 
    <rect x="9" y="7" rx="10" ry="10" width="315" height="236" /> 
    <rect x="8" y="255" rx="10" ry="10" width="150" height="236" /> 
    <rect x="174" y="256" rx="10" ry="10" width="150" height="236" />
  </ContentLoader>
)

export default Loader