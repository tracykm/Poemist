import * as queryString from "query-string";

// most own file for types
export function getQueryObj(queryStr: string) {
  return queryString.parse(queryStr) as {
    showLogin: boolean;
  };
}
