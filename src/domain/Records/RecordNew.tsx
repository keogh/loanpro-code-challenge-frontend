import * as React from 'react';
import RecordForm from "./RecordForm";
import {OPERATIONS_URL} from "../Api/routes";

export const loader = async () => {
  return fetch(OPERATIONS_URL, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authToken') ?? '',
    },
  })
}

const RecordNew = () => {
  return (
    <>
      <RecordForm />
    </>
  );
}

export default RecordNew;
