import * as React from "react";
import DataGrid, {Column} from 'react-data-grid';
import {IRecordsTableRow} from "./types";

const columns: Column<IRecordsTableRow>[] = [
  { key: 'id', name: 'ID' },
  { key: 'operation_type', name: 'Operation' },
  { key: 'operation_response', name: 'Result' },
  { key: 'amount', name: 'Amount' },
  { key: 'user_balance', name: 'Balance' },
  { key: 'created_at', name: 'Created' },
  { key: 'actions', name: 'Actions' },
];

const DEFAULT_COLUMN_OPTIONS = {
  resizable: true,
};

type Props = {
  items: IRecordsTableRow[],
}

const RecordsTable = ({ items }: Props) => {
  return (
    <>
      <DataGrid
        columns={columns}
        rows={items}
        defaultColumnOptions={DEFAULT_COLUMN_OPTIONS}
      />
    </>
  );
};

export default RecordsTable;
