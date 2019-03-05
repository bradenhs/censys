import { authenticate } from "./authenticate";
import { AppModel } from "../models/AppModel";
import localforage from "localforage";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "../constants/localStorage";

export async function initializeApp(appModel: AppModel) {
  const authToken = await localforage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);

  if (typeof authToken === "string") {
    await authenticate(appModel, authToken);
  }

  appModel.initializing = false;
}
