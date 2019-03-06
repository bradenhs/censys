import { Runtype } from "runtypes";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

type RequestResult<Data> =
  | {
      ok: true;
      data: Data;
      response: AxiosResponse<Data>;
    }
  | {
      ok: false;
      data: unknown;
      response: unknown;
    };

export async function makeRequest<Data>(
  url: string,
  params: { authToken: string; type: Runtype<Data>; json?: any }
): Promise<RequestResult<Data>> {
  let response: AxiosResponse<Data> | undefined;

  try {
    response = await axios(getUrl(url), getRequestOptions(params));

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Non 200 status code");
    }

    return {
      ok: true as true,
      data: params.type.check(response.data),
      response
    };
  } catch (error) {
    return {
      ok: false as false,
      data: error,
      response
    };
  }
}

function getUrl(url: string) {
  // CORS appears to be improperly configured on the censys api
  // so I included this prefix to circumvent the issue.
  // The correct "Access-Control-Allow-Origin: *" header is set
  // but the OPTIONS pre-flight request is responding with
  // a 403 unauthorized. Browsers don't send authorization headers with
  // OPTIONS requests so when the server sees an OPTIONS request it
  // shouldn't attempt to authenticate but rather always return a 200 status
  // code.
  const prefix = "https://cors-anywhere.herokuapp.com/";

  if (window.Cypress) {
    // Cypress tests mock server responses so the prefix is not
    // needed when running Cypress.
    return url;
  }

  return prefix + url;
}

function getRequestOptions(params: { authToken: string; json?: any }) {
  const headers: Record<string, string> = {
    authorization: `Basic ${params.authToken}`
  };

  if (params.json) {
    headers["content-type"] = "application/json";
  }

  const requestOptions: AxiosRequestConfig = {
    headers
  };

  if (params.json) {
    requestOptions.method = "POST";
    requestOptions.data = JSON.stringify(params.json);
  } else {
    requestOptions.method = "GET";
  }

  return requestOptions;
}
