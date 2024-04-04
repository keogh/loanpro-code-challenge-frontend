import {OPERATIONS_URL, RECORDS_LIST_URL} from "../Api/routes";

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
  return fetch(RECORDS_LIST_URL, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authToken') ?? '',
    },
  })
}
