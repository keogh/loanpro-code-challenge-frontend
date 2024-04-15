import * as React from "react";
import {useLoaderData} from "react-router-dom";
import {CalculatorIcon} from "@heroicons/react/20/solid";

import RecordsTable from "./RecordsTable";
import {IRecordsListLoader} from "./types";
import {Pagination} from "../Pagination";
import {SearchBar} from "../SearchBar";
import Button from "../../components/Button";

const RecordsList = () => {
  const { records = [], pagination } = useLoaderData() as IRecordsListLoader;

  return (
    <>
      <h1 className="text-2xl mb-8">User Records</h1>
      <div className="mb-4">
        <div className="flex justify-between items-baseline gap-x-4">
          <div className="flex-grow">
            <SearchBar
              placeholder={`Write an operation type, like "addition"...`}
            />
          </div>
          <div className="flex-grow-0">
            <Button
              className="flex items-center justify-center"
              title="New Record"
              to="/records/new"
            >
              +
              <CalculatorIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-md py-1">
        <RecordsTable items={records}/>
        {pagination && (
          <div className="py-2">
            <Pagination
              page={parseInt(pagination.page, 10)}
              perPage={parseInt(pagination.per_page, 10)}
              totalPages={pagination.total_pages}
              totalItems={pagination.total_items}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default RecordsList;
