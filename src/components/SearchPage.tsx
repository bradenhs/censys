import React from "react";
import { observer } from "mobx-react-lite";
import { Search } from "./Search";
import { H3, Divider, Classes, NonIdealState } from "@blueprintjs/core";
import { TransitionIn } from "./TransitionIn";
import { SMALL_FORM_MAX_WIDTH } from "../constants/layout";
import { useWindowSize } from "react-use";
import { style } from "typestyle";
import { SearchResultList } from "./SearchResultList";
import { useAppModel } from "../utils/useAppModel";

const dividerClassName = style({
  marginBottom: "20px",
  marginTop: "20px"
});

const searchContainerClassName = style({
  marginTop: "30px",
  marginBottom: "30px"
});

export const SearchPage = observer(() => {
  const appModel = useAppModel();
  const { width } = useWindowSize();

  return (
    <>
      <TransitionIn type="slide">
        <H3>Search</H3>
      </TransitionIn>
      <TransitionIn delay={100} type="slide">
        {width > SMALL_FORM_MAX_WIDTH && (
          <Divider className={dividerClassName} />
        )}
        <p className={Classes.TEXT_MUTED}>
          Use <a href="https://censys.io/ipv4/help">Censys query syntax</a> to
          filter results on this page.
        </p>
      </TransitionIn>
      <TransitionIn
        delay={200}
        type="slide"
        className={searchContainerClassName}
      >
        <Search />
      </TransitionIn>
      <TransitionIn delay={300} type="slide">
        {appModel.results.length === 0 ? (
          <NonIdealState
            icon="ip-address"
            description={
              <span className={Classes.TEXT_MUTED}>
                {appModel.hasSearched
                  ? "No results"
                  : "Results will appear here"}
              </span>
            }
          />
        ) : (
          <SearchResultList />
        )}
      </TransitionIn>
    </>
  );
});
