if (module.hot) {
  module.hot.dispose(() => {
    location.reload();
    throw "Reloading...";
  });
}

import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./components/AppProvider";
import { App } from "./components/App";
import { FocusStyleManager } from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
