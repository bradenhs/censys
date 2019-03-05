import { AppModel } from "../models/AppModel";
import { observable } from "mobx";

export function createAppModel() {
  const appModel: AppModel = {
    results: [],
    authDetails: null,
    initializing: true,
    totalPages: null,
    pendingSearchRequest: false,
    search: "",
    hasSearched: false,
    page: 1
  };

  return observable(appModel);
}
