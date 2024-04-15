import * as React from 'react';
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/20/solid";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {ISearchBarFormInput} from "./types";
import {useUpdateSearchQuery} from "../Navigation";

type Props = {
  placeholder?: string;
}

const SearchBar = ({ placeholder }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ISearchBarFormInput>();

  const updateSearchQuery = useUpdateSearchQuery();

  const onSubmit: SubmitHandler<ISearchBarFormInput> = async (data) => {
    updateSearchQuery(data.search);
  }

  const handleClickReset = React.useCallback(() => {
    reset();
    updateSearchQuery('');
  }, [reset, updateSearchQuery]);

  const searchValue = watch('search');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mt-2 flex rounded-md shadow-sm border-red-900">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
          </div>
          <Input
            type="text"
            id="search"
            className={`
              block w-full rounded-md rounded-br-none rounded-tr-none border-0 
              py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
            `}
            placeholder={placeholder ?? 'Search...'}
            autoComplete="off"
            {...register('search', {required: true})}
          />
          {searchValue && searchValue.length > 0 && (
            <div
              className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={handleClickReset}
            >
              <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
            </div>
          )}
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
    </form>
  );
};

export default SearchBar;
