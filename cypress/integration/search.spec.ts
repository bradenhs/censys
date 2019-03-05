/// <reference types="cypress"/>
/// <reference types="cypress-testing-library"/>

import { init } from "../utils/init";
import { SEARCH_ENDPOINT } from "../../src/constants/api";
import { SearchResult } from "../../src/utils/api";

describe("search", () => {
  it("should search properly", () => {
    const pageTwo: SearchResult = {
      status: "ok",
      results: [
        {
          ip: "Page 2 Result",
          protocols: [":)"]
        }
      ],
      metadata: {
        count: 5,
        backend_time: 1,
        page: 2,
        pages: 2,
        query: "10"
      }
    };

    init({ startSignedIn: true })
      .getByPlaceholderText("Search IPv4 Hosts...")
      .type("10{enter}")
      .getByText("Page 1 Result")
      .route({
        url: SEARCH_ENDPOINT,
        method: "POST",
        response: pageTwo
      })
      .getByText("Next")
      .click()
      .getByText("Page 2 Result");
  });

  it("should handle errors properly", () => {
    init({ startSignedIn: true })
      .route({
        method: "POST",
        url: SEARCH_ENDPOINT,
        status: 500
      })
      .getByPlaceholderText("Search IPv4 Hosts...")
      .type("10{enter}")
      .getByText("Unable to complete query. Error details logged to console.");
  });
});
