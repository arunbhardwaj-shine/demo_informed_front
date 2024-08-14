import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
const LoadingBarr = (props) => {
  const ref = useRef(null);
  useEffect(() => {
    if (props.loading === true) {
      ref.current.continuousStart();
    } else if (props.loading === false) {
      ref.current.complete();
    }
  }, [props.loading]);
  return <LoadingBar color="#0b3a81" ref={ref} />;
};
export default LoadingBarr;
