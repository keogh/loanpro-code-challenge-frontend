import {RECORD_CREATE_URL, RECORDS_DELETE_URL} from "./routes";

export const postRecord = async <T>(data: T) => {
  const authToken = localStorage.getItem('authToken') ?? '';

  const response = await fetch(RECORD_CREATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authToken,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.error);
  }

  return responseData;
}

export const deleteRecord = async (recordId: number) => {
  const authToken = localStorage.getItem('authToken') ?? '';

  const response = await fetch(`${RECORDS_DELETE_URL}/${recordId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authToken,
    },
  });

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.error);
  }

  return responseData;
}
