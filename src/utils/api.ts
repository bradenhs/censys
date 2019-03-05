import { makeRequest } from "./makeRequest";
import {
  ACCOUNT_ENDPOINT,
  SEARCH_ENDPOINT as SEARCH_IPV4_ENDPOINT
} from "../constants/api";
import * as t from "runtypes";

export const AccountResult = t.Record({
  login: t.String,
  email: t.String,
  api_id: t.String,
  api_secret: t.String,
  first_login: t.String,
  last_login: t.String,
  quota: t.Record({
    used: t.Number,
    resets_at: t.String,
    allowance: t.Number
  })
});

export type AccountResult = t.Static<typeof AccountResult>;

export const SearchResult = t.Record({
  status: t.Literal("ok"),
  metadata: t.Record({
    count: t.Number,
    query: t.String,
    backend_time: t.Number,
    page: t.Number,
    pages: t.Number
  }),
  results: t.Array(
    t.Record({
      ip: t.String,
      protocols: t.Array(t.String)
    })
  )
});

export type SearchResult = t.Static<typeof SearchResult>;

export const api = {
  account(params: { authToken: string }) {
    return makeRequest(ACCOUNT_ENDPOINT, { ...params, type: AccountResult });
  },
  searchIPv4(params: { authToken: string; query: string; page: number }) {
    return makeRequest(SEARCH_IPV4_ENDPOINT, {
      authToken: params.authToken,
      type: SearchResult,
      json: {
        query: params.query,
        page: params.page
      }
    });
  }
};
