import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import { InputGroup, Button } from "@blueprintjs/core";
import { useAppModel } from "../utils/useAppModel";
import { searchIPv4 } from "../actions/searchIPv4";
import { TransitionIn } from "./TransitionIn";
import { updateSearch } from "../actions/updateSearch";

export const Search = observer(() => {
  const appModel = useAppModel();
  const searchRef = useRef<HTMLInputElement | null>(null);

  return (
    <TransitionIn type="slide">
      <form onSubmit={handleSubmit}>
        <InputGroup
          placeholder="Search IPv4 Hosts..."
          leftIcon="search"
          large
          name="search"
          inputRef={ref => (searchRef.current = ref)}
          onChange={handleChange}
          rightElement={
            <Button
              loading={appModel.pendingSearchRequest}
              icon="arrow-right"
              minimal
              type="submit"
            />
          }
          round
        />
      </form>
    </TransitionIn>
  );

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    updateSearch(appModel, event.currentTarget.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    searchIPv4(appModel, { search: appModel.search, page: 1 });
  }
});
