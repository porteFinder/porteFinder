import React from "react";
import { StateConsumer } from "./context";

const WithContext = Component => {
  return props => (
    <StateConsumer>
      {value => <Component {...props} value={value} />}
    </StateConsumer>
  );
};

export default WithContext;
