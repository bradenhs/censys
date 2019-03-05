import React from "react";
import { observer } from "mobx-react-lite";
import { useAppModel } from "../utils/useAppModel";
import { Tag, Button, H4, Divider, Classes } from "@blueprintjs/core";
import { style, classes } from "typestyle";
import { searchIPv4 } from "../actions/searchIPv4";

const searchResultClassName = style({
  marginBottom: "15px",
  marginLeft: "10px",
  marginRight: "10px"
});

const tagClassName = style({
  marginRight: "5px",
  marginBottom: "5px"
});

const footerClassName = style({
  display: "flex",
  marginTop: "15px"
});

const pageLabelClassName = classes(
  Classes.TEXT_MUTED,
  style({
    fontSize: "16px",
    padding: "10px",
    flexGrow: 1,
    textAlign: "center"
  })
);

export const SearchResultList = observer(() => {
  const appModel = useAppModel();

  return (
    <>
      {appModel.results.map((result, index) => {
        return (
          <div key={index} className={searchResultClassName}>
            <H4>{result.ip}</H4>
            {result.protocols.map((protocol, index) => (
              <Tag minimal className={tagClassName} key={index}>
                {protocol}
              </Tag>
            ))}
          </div>
        );
      })}
      {appModel.totalPages !== null && appModel.totalPages !== 0 && (
        <>
          <Divider />
          <footer className={footerClassName}>
            <Button
              onClick={handlePreviousClick}
              minimal
              large
              disabled={appModel.pendingSearchRequest || appModel.page === 1}
            >
              Previous
            </Button>
            <div className={pageLabelClassName}>
              Page <b>{appModel.page.toLocaleString()}</b> of{" "}
              {appModel.totalPages.toLocaleString()}
            </div>
            <Button
              onClick={handleNextClick}
              minimal
              large
              disabled={
                appModel.pendingSearchRequest ||
                appModel.page === appModel.totalPages
              }
            >
              Next
            </Button>
          </footer>
        </>
      )}
    </>
  );

  function handlePreviousClick() {
    searchIPv4(appModel, { search: appModel.search, page: appModel.page - 1 });
  }

  function handleNextClick() {
    searchIPv4(appModel, { search: appModel.search, page: appModel.page + 1 });
  }
});
