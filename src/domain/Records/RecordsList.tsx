import * as React from "react";
import {useLoaderData, useNavigate} from "react-router-dom";

import RecordsTable from "./RecordsTable";
import {IRecordsListLoader} from "./types";

const RecordsList = () => {
  const data = useLoaderData() as IRecordsListLoader;
  console.log(data.records)

  return (
    <>
      <RecordsTable items={data.records} />
    </>
  );
};

export default RecordsList;
