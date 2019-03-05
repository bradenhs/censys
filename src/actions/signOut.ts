import { AppModel } from "../models/AppModel";
import localforage from "localforage";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "../constants/localStorage";
import { transaction } from "mobx";
import { createAppModel } from "../utils/createAppModel";

export function signOut(appModel: AppModel) {
  localforage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);

  transaction(() => {
    Object.assign(appModel, { ...createAppModel(), initializing: false });
  });
}
