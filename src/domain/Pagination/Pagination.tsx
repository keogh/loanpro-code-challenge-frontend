import * as React from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {useNavigate} from "react-router-dom";

type Props = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

const Pagination = ({
  page,
  perPage,
  totalPages,
  totalItems
}: Props) => {
  const navigate = useNavigate();

  const handleChangePerPage = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/records?page=${page}&per_page=${e.target.value}`);
  }, [page, navigate]);

  const rowsPerPageOptions = React.useMemo(() => {
    const options = [];
    let i = 0;
    do {
      i = i + 5;
      options.push({
        label: i,
        value: i,
      });
    } while (i < totalItems);

    return options;
  }, [totalItems]);

  const lastItemNumber = page * perPage;
  let firstItemNumber = (lastItemNumber - perPage) + 1;
  const isFirstPage = page === 1;
  const isLastPage = page === Math.ceil(totalItems / perPage);

  return (
    <div className="flex justify-between">
      <div>
        <label>Rows per page:</label>
        <select onChange={handleChangePerPage} value={perPage}>
          {rowsPerPageOptions.map((option, i) => (
            <option
              key={i}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-start items-center gap-5">
        <div>
          {firstItemNumber} - {lastItemNumber > totalItems ? totalItems : lastItemNumber} of {totalItems}
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href={isFirstPage ? "#" : `/records?page=${page-1}&per_page=${perPage}`}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <span
              aria-current="page"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {page}
            </span>
            <a
              href={isLastPage ? "#" : `/records?page=${page+1}&per_page=${perPage}`}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
