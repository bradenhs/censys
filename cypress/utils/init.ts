/// <reference types="cypress"/>
/// <reference types="cypress-testing-library"/>

import localforage from "localforage";
import { AccountResult, SearchResult } from "../../src/utils/api";
import { ACCOUNT_ENDPOINT, SEARCH_ENDPOINT } from "../../src/constants/api";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "../../src/constants/localStorage";
import { getAuthToken } from "../../src/utils/getAuthToken";

const defaultAccountEndpountResult: AccountResult = {
  api_id: "1234",
  api_secret: "abcd",
  email: "faker@user.com",
  first_login: new Date().toISOString(),
  last_login: new Date().toISOString(),
  login: "faker_username",
  quota: {
    used: 0,
    allowance: 250,
    resets_at: new Date().toISOString()
  }
};

const defaultSearchEndpointResult: SearchResult = {
  results: [
    {
      ip: "Page 1 Result",
      protocols: [":)"]
    },
    {
      ip: "Page 1 Result",
      protocols: [":)"]
    },
    {
      ip: "Page 1 Result",
      protocols: [":)"]
    },
    {
      ip: "Page 1 Result",
      protocols: [":)"]
    },
    {
      ip: "Page 1 Result",
      protocols: [":)"]
    }
  ],
  metadata: {
    count: 5,
    page: 1,
    pages: 2,
    backend_time: 0,
    query: "10"
  },
  status: "ok"
};

export function init(
  options: {
    accountEndpointResult?: AccountResult;
    searchEndpointResult?: SearchResult;
    startSignedIn?: boolean;
  } = {}
) {
  if (!options.accountEndpointResult) {
    options.accountEndpointResult = defaultAccountEndpountResult;
  }

  if (!options.searchEndpointResult) {
    options.searchEndpointResult = defaultSearchEndpointResult;
  }

  return cy
    .visit("/", {
      onBeforeLoad: async () => {
        await localforage.clear();
        if (options.startSignedIn) {
          await localforage.setItem(
            LOCAL_STORAGE_AUTH_TOKEN_KEY,
            getAuthToken(
              defaultAccountEndpountResult.api_id,
              defaultAccountEndpountResult.api_secret
            )
          );
        }
      }
    })
    .server()
    .route({
      url: SEARCH_ENDPOINT,
      method: "POST",
      response: options.searchEndpointResult
    })
    .route(ACCOUNT_ENDPOINT, options.accountEndpointResult);
}
