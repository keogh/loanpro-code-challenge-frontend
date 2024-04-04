import {RECORD_CREATE_URL} from "./routes";

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
