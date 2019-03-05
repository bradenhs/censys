import { AppModel } from "../models/AppModel";
import { api } from "../utils/api";
import { showToast } from "../utils/showToast";
import { getAuthToken } from "../utils/getAuthToken";
import localforage from "localforage";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "../constants/localStorage";

export async function authenticate(
  appModel: AppModel,
  auth:
    | {
        apiID: string;
        secret: string;
      }
    | string
) {
  const authToken =
    typeof auth === "string" ? auth : getAuthToken(auth.apiID, auth.secret);

  const response = await api.account({ authToken });

  if (!response.ok) {
    console.error(response.data);
    showToast({
      message: "Unable to authenticate. Error details logged to console.",
      intent: "danger",
      icon: "issue"
    });
    return;
  }

  localforage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, authToken);

  appModel.authDetails = {
    login: response.data.login,
    authToken
  };
}
