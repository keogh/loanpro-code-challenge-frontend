import * as React from "react";
import { useLoaderData } from "react-router-dom";

import RecordsTable from "./RecordsTable";
import {IRecordsListLoader} from "./types";
import Pagination from "../Pagination/Pagination";

const RecordsList = () => {
  const { records = [], pagination } = useLoaderData() as IRecordsListLoader;

  return (
    <>
      <RecordsTable items={records} />
      {pagination && (
        <Pagination
          page={parseInt(pagination.page, 10)}
          perPage={parseInt(pagination.per_page, 10)}
          totalPages={pagination.total_pages}
          totalItems={pagination.total_items}
        />
      )}
    </>
  );
};

export default RecordsList;
