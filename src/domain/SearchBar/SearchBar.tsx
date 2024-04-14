import * as React from 'react';
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import Input from "../../components/Input";
import Button from "../../components/Button";

type Props = {
  placeholder?: string;
}

const SearchBar = ({ placeholder }: Props) => {
  return (
    <div className="relative mt-2 flex rounded-md shadow-sm border-red-900">
      <div className="relative flex flex-grow items-stretch focus-within:z-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
        </div>
        <Input
          type="text"
          name="search"
          id="search"
          className={`
            block w-full rounded-md rounded-br-none rounded-tr-none border-0 
            py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
          `}
          placeholder={placeholder ?? 'Search...'}
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="-ml-px">
        <Button
          type="submit"
          variant="soft"
          className="rounded-tl-none rounded-bl-none ring-1 ring-inset ring-gray-300"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
