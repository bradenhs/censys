/// <reference types="cypress"/>
/// <reference types="cypress-testing-library"/>

import { init } from "../utils/init";
import { getAuthToken } from "../../src/utils/getAuthToken";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "../../src/constants/localStorage";
import localforage from "localforage";
import { AccountResult } from "../../src/utils/api";
import { ACCOUNT_ENDPOINT } from "../../src/constants/api";

describe("authentication", () => {
  it("should sign in and sign out properly", () => {
    const accountEndpointResult: AccountResult = {
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

    init({ accountEndpointResult })
      .getByPlaceholderText("API ID")
      .type("1234")
      .getByPlaceholderText("Secret")
      .type("abcd")
      .get("button")
      .within(() => cy.getByText("Authenticate"))
      .click()
      .wrap(localforage)
      .invoke("getItem", LOCAL_STORAGE_AUTH_TOKEN_KEY)
      .should(
        "equal",
        getAuthToken(
          accountEndpointResult.api_id,
          accountEndpointResult.api_secret
        )
      )
      .getByText("faker_username")
      .should("exist")
      .click()
      .getByText("Sign out")
      .click()
      .wrap(localforage)
      .invoke("getItem", LOCAL_STORAGE_AUTH_TOKEN_KEY)
      .should("equal", null)
      .getByText("Authenticate")
      .should("exist");
  });

  it("should display errors on invalid submissions", () => {
    init()
      .get("button")
      .within(() => cy.getByText("Authenticate"))
      .click()
      .getByText("Required")
      .should("exist")
      .route({ url: ACCOUNT_ENDPOINT, status: 500 })
      .getByPlaceholderText("API ID")
      .type("1234")
      .getByPlaceholderText("Secret")
      .type("abcd")
      .get("button")
      .within(() => cy.getByText("Authenticate"))
      .click()
      .getByText("Unable to authenticate. Error details logged to console.");
  });
});
