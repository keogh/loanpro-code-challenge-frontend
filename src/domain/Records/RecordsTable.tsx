import * as React from "react";
import DataGrid, {Column, SortColumn} from 'react-data-grid';
import {GetColumnsArgs, IRecordsTableRow} from "./types";
import {useUpdateQueryString} from "../Navigation";
import { TrashIcon } from "@heroicons/react/20/solid";
import Button from "../../components/Button";
import ConfirmDialog from "../../components/ConfirmDialog";

const getColumns = ({ onClickDelete }: GetColumnsArgs): Column<IRecordsTableRow>[] => ([
  { key: 'id', name: 'ID' },
  { key: 'operation_type', name: 'Operation' },
  { key: 'operation_response', name: 'Result' },
  { key: 'amount', name: 'Amount' },
  { key: 'user_balance', name: 'Balance' },
  { key: 'created_at', name: 'Created' },
  {
    key: 'actions',
    name: 'Actions',
    renderCell: ({row}) => {
      // TODO: create a renderer or a component
      const onClick = () => {
        onClickDelete(row.id);
      };

      return (
        <>
          <Button variant="secondary" onClick={onClick}>
            <TrashIcon className="h-5 w-5" />
          </Button>
        </>
      );
    }
  },
]);

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
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [currentRowId, setCurrentRowId] = React.useState<number | null>(null);

  const handleSortColumnsChange = React.useCallback((columns: SortColumn[]) => {
    const { columnKey: sort_by = '', direction = '' } = columns[0] ?? {};
    setSortColumns(columns);
    updateQueryString({ sort_by, direction });
  }, [updateQueryString]);

  const handleClickConfirm = React.useCallback(() => {
    if (currentRowId === null) {
      setOpenConfirmDialog(false);
      return;
    }
    console.log(`Delete rowId: ${currentRowId}`);
    // TODO: Call DELETE API
  }, [currentRowId]);

  const columns = React.useMemo(() => {
    return getColumns({
      onClickDelete: (rowId: number) => {
        setCurrentRowId(rowId);
        setOpenConfirmDialog(true);
      },
    });
  }, []);

  const handleCloseConfirmDialog = React.useCallback(() => {
    setCurrentRowId(null);
    setOpenConfirmDialog(false);
  }, []);

  return (
    <>
      <ConfirmDialog
        content={`
          Are you sure you want to delete the record?
          The record will be permanently removed. This action cannot be undone.
        `}
        open={openConfirmDialog}
        onConfirm={handleClickConfirm}
        onClose={handleCloseConfirmDialog}
        title="Delete Record"
        confirmButtonLabel="Delete"
      />
      <DataGrid
        className="rdg-light"
        columns={columns}
        rows={items}
        defaultColumnOptions={DEFAULT_COLUMN_OPTIONS}
        sortColumns={sortColumns}
        onSortColumnsChange={handleSortColumnsChange}
        rowKeyGetter={(row) => row.id}
      />
    </>
  );
};

export default RecordsTable;
