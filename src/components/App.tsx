import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { style, cssRule, media } from "typestyle";
import { Classes, Colors, Spinner } from "@blueprintjs/core";
import { Header } from "./Header";
import { useAppModel } from "../utils/useAppModel";
import { AuthPage } from "./AuthPage";
import { SearchPage } from "./SearchPage";
import { initializeApp } from "../actions/initializeApp";
import { TransitionIn } from "./TransitionIn";

cssRule("body", {
  background: Colors.DARK_GRAY4
});

const pageContainerClassName = style(
  {
    maxWidth: "750px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "40px"
  },
  media({ maxWidth: 600 }, { padding: "20px" }),
  media({ maxWidth: 350 }, { padding: "10px" })
);

const spinnerClassName = style({
  marginTop: "100px"
});

export const App = observer(() => {
  const appModel = useAppModel();

  useEffect(() => {
    initializeApp(appModel);
  }, []);

  return (
    <div className={Classes.DARK}>
      <Header />
      {appModel.initializing ? (
        <TransitionIn type="fade" delay={100}>
          <Spinner className={spinnerClassName} />
        </TransitionIn>
      ) : (
        <main className={pageContainerClassName}>
          {appModel.authDetails === null ? <AuthPage /> : <SearchPage />}
        </main>
      )}
    </div>
  );
});
