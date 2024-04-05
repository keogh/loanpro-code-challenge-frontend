import * as React from "react";
import { useLoaderData } from "react-router-dom";

import RecordsTable from "./RecordsTable";
import {IRecordsListLoader} from "./types";

const RecordsList = () => {
  const data = useLoaderData() as IRecordsListLoader;

  return (
    <>
      <RecordsTable items={data?.records ?? []} />
    </>
  );
};

export default RecordsList;
