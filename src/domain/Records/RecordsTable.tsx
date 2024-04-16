import * as React from "react";
import DataGrid, {Column, SortColumn} from 'react-data-grid';
import {IRecordsTableRow} from "./types";
import {useUpdateQueryString} from "../Navigation";

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
  sortable: true,
};

type Props = {
  items: IRecordsTableRow[],
}

const RecordsTable = ({ items }: Props) => {
  const updateQueryString = useUpdateQueryString();
  const [sortColumns, setSortColumns] = React.useState<SortColumn[]>([]);

  const handleSortColumnsChange = React.useCallback((columns: SortColumn[]) => {
    const { columnKey: sort_by = '', direction = '' } = columns[0] ?? {};
    setSortColumns(columns);
    updateQueryString({ sort_by, direction });
  }, [updateQueryString]);

  return (
    <>
      <DataGrid
        className="rdg-light"
        columns={columns}
        rows={items}
        defaultColumnOptions={DEFAULT_COLUMN_OPTIONS}
        sortColumns={sortColumns}
        onSortColumnsChange={handleSortColumnsChange}
      />
    </>
  );
};

export default RecordsTable;
