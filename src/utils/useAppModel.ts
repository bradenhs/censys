import { useContext } from "react";
import { appModelContext } from "./appModelContext";

export function useAppModel() {
  const appModel = useContext(appModelContext);

  if (appModel === null) {
    throw new Error(
      `Expected appModel to be non-null. Make sure you use the appModelContext.Provider component to provide the appModel.`
    );
  }

  return appModel;
}
