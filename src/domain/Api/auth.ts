import {SING_OUT_URL} from "./routes";

export const postSignOut = async () => {
  const authToken = localStorage.getItem('authToken') ?? '';

  const response = await fetch(SING_OUT_URL, {
    method: 'POST',
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
