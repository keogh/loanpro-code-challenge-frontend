import { LoaderFunction } from 'react-router-dom';
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

export const recordsListLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  return getApi(`${RECORDS_LIST_URL}${url.search}`);
}
