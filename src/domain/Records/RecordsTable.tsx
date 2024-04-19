import * as React from "react";
import DataGrid, {Column, SortColumn} from 'react-data-grid';
import {GetColumnsArgs, IRecordsTableRow} from "./types";
import {useUpdateQueryString} from "../Navigation";
import { TrashIcon } from "@heroicons/react/20/solid";
import Button from "../../components/Button";
import ConfirmDialog from "../../components/ConfirmDialog";
import {deleteRecord} from "../Api/records";
import {useLocation, useNavigate} from "react-router-dom";
import {useFlash} from "../../components/Flash";

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
        <div className="flex justify-start items-center h-full">
          <div>
            <Button  variant="secondary" onClick={onClick}>
              <TrashIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
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
  const navigate = useNavigate();
  const location = useLocation();
  const updateQueryString = useUpdateQueryString();
  const { addFlash } = useFlash();

  const [sortColumns, setSortColumns] = React.useState<SortColumn[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [currentRowId, setCurrentRowId] = React.useState<number | null>(null);

  const handleSortColumnsChange = React.useCallback((columns: SortColumn[]) => {
    const { columnKey: sort_by = '', direction = '' } = columns[0] ?? {};
    setSortColumns(columns);
    updateQueryString({ sort_by, direction });
  }, [updateQueryString]);

  const handleClickConfirm = React.useCallback(async () => {
    if (currentRowId === null) {
      setOpenConfirmDialog(false);
      return;
    }

    try {
      await deleteRecord(currentRowId);
      addFlash(`Record with id ${currentRowId} was successfully deleted.`);
      const currentPath = location.pathname + location.search + location.hash;
      navigate(currentPath, { replace: true });
    } catch (e) {
      addFlash(`Error while trying to delete Record with id ${currentRowId}. ${e}`);
    } finally {
      setOpenConfirmDialog(false);
      setCurrentRowId(null);
    }
  }, [addFlash, currentRowId, location.hash, location.pathname, location.search, navigate]);

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
          Are you sure you want to delete the record? All the balances after the record will be updated. 
          The record will be permanently removed. This action cannot be undone. This
        `}
        open={openConfirmDialog}
        onConfirm={handleClickConfirm}
        onClose={handleCloseConfirmDialog}
        title="Delete Record"
        confirmButtonLabel="Delete"
      />
      <div className="h-[320px] lg:h-[720px]">
        <DataGrid
          className="rdg-light"
          columns={columns}
          rows={items}
          defaultColumnOptions={DEFAULT_COLUMN_OPTIONS}
          sortColumns={sortColumns}
          onSortColumnsChange={handleSortColumnsChange}
          rowKeyGetter={rowGetter}
        />
      </div>
    </>
  );
};

function rowGetter(row: IRecordsTableRow) {
  return row.id
}

export default RecordsTable;
