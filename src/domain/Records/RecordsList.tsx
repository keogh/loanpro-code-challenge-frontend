import * as React from "react";
import {Link, useLoaderData} from "react-router-dom";

import RecordsTable from "./RecordsTable";
import {IRecordsListLoader} from "./types";
import Pagination from "../Pagination/Pagination";

const RecordsList = () => {
  const { records = [], pagination } = useLoaderData() as IRecordsListLoader;

  return (
    <>
      <h1 className="text-2xl mb-8">User Records</h1>
      <div className="mb-4">
        <Link
          className="text-blue-700 font-bold"
          to="/records/new"
        >
          + New Record
        </Link>
      </div>
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
