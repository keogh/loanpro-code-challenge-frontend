import {IPaginationResponsePartial} from "../Pagination/types";

export interface IRecordsListLoader {
  success: boolean;
  pagination: IPaginationResponsePartial;
  records: IRecordsTableRow[];
}

export interface IRecordsTableRow {
  id: number;
  operation_type: string;
  operation_response: number | string;
  amount: number;
  user_balance: number;
  created_at: string;
}
