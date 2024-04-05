import {SING_IN_URL} from "../Api/routes";
import {FormInput} from "./types";
import {postApi} from "../Api/utils";

export const signIn = async (data: FormInput) => {
  const response = await postApi<FormInput>(SING_IN_URL, data,true);
  return await response.json();
}
