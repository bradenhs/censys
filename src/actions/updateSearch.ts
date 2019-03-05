import { AppModel } from "../models/AppModel";

export function updateSearch(appModel: AppModel, search: string) {
  appModel.search = search;
}
