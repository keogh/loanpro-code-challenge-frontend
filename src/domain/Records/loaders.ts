import {OPERATIONS_URL, RECORDS_LIST_URL} from "../Api/routes";
import {getApi} from "../Api/utils";

export const recordNewLoader = async () => {
  return fetch(OPERATIONS_URL, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authToken') ?? '',
    },
  })
}

export const recordsListLoader = async () => {
  return getApi(RECORDS_LIST_URL);
}
