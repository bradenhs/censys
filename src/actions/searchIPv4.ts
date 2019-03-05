import { AppModel } from "../models/AppModel";
import { api } from "../utils/api";
import { showToast } from "../utils/showToast";
import { transaction } from "mobx";

export async function searchIPv4(
  appModel: AppModel,
  params: { search: string; page: number }
) {
  if (appModel.authDetails === null) {
    throw new Error("authDetails must be defined in order to search.");
  }

  if (appModel.pendingSearchRequest) {
    return;
  }

  appModel.pendingSearchRequest = true;

  const response = await api.searchIPv4({
    authToken: appModel.authDetails.authToken,
    page: params.page,
    query: params.search
  });

  appModel.pendingSearchRequest = false;

  if (!response.ok) {
    console.error(response.data);
    showToast({
      message: "Unable to complete query. Error details logged to console.",
      intent: "danger",
      icon: "issue"
    });
    return;
  }

  transaction(() => {
    appModel.hasSearched = true;
    appModel.results = response.data.results;
    appModel.page = response.data.metadata.page;
    appModel.totalPages = response.data.metadata.pages;
  });
}
