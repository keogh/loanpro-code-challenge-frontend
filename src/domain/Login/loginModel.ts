import {SING_IN_URL} from "../Api/routes";
import {FormInput} from "./types";

export const signIn = async (data: FormInput) => {
  const response = await fetch(SING_IN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}
