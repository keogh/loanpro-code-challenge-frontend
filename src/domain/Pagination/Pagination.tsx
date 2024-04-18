import * as React from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/20/solid";
import {Link, useNavigate} from "react-router-dom";

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
    let delta;

    if (totalItems < 50) {
      delta = 5;
    } else if (totalItems < 100) {
      delta = 10;
    } else if (totalItems < 500) {
      delta = 25;
    } else if (totalItems < 1000) {
      delta = 50;
    } else {
      delta = 100;
    }

    do {
      i = i + delta;
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
    <div className="flex flex-col sm:flex-row sm:justify-between gap-y-3">
      <div className="flex items-baseline gap-x-2 pl-2">
        <label htmlFor="rowsPerPage" className="text-sm">
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          onChange={handleChangePerPage}
          value={perPage}
          className="mt-2 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
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

      <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center gap-3 pl-3 pr-2">
        <div className="text-sm">
          {firstItemNumber} - {lastItemNumber > totalItems ? totalItems : lastItemNumber} of {totalItems}
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Link
              to={`/records?page=1&per_page=${perPage}`}
              className={`
                ${isFirstPage ? 'pointer-events-none' : ''}
                relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 
                ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
              `}
            >
              <span className="sr-only">First</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              to={`/records?page=${page-1}&per_page=${perPage}`}
              className={`
                ${isFirstPage ? 'pointer-events-none' : ''}
                relative inline-flex items-center px-2 py-2 text-gray-400 
                ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
              `}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <span
              aria-current="page"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {page}
            </span>
            <Link
              to={`/records?page=${page+1}&per_page=${perPage}`}
              className={`
                ${isLastPage ? 'pointer-events-none' : ''}
                relative inline-flex items-center px-2 py-2 text-gray-400 
                ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
              `}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>

            <Link
              to={`/records?page=${totalPages}&per_page=${perPage}`}
              className={`
                ${isLastPage ? 'pointer-events-none' : ''}
                relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 
                ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
              `}
            >
              <span className="sr-only">Last</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
