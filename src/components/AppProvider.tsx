import React, { useRef } from "react";
import { createAppModel } from "../utils/createAppModel";
import { appModelContext } from "../utils/appModelContext";

type Props = {
  children: React.ReactElement;
};

export const AppProvider = (props: Props) => {
  const appModelRef = useRef(createAppModel());

  return (
    <appModelContext.Provider value={appModelRef.current}>
      {props.children}
    </appModelContext.Provider>
  );
};
