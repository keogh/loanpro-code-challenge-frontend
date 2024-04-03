import * as React from 'react';
import Input from "../../components/Input";
import {useLoaderData} from "react-router-dom";

interface IOperation {
  id: number | string;
  type: string;
  cost: number;
}

interface IOperationResponse {
  success: boolean;
  operations: IOperation[];
}

const RecordForm = () => {
  const data = useLoaderData() as IOperationResponse;
  const operations = data.operations;

  return (
    <div
      className={`
        flex min-h-full flex-1 flex-col justify-center px-6 py-12 
        lg:px-8 md:max-w-[450px]
        ring-1 ring-gray-200 shadow-sm 
        rounded-lg`}
    >
      <form>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="opearationType"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              What operation do you want to create?
            </label>
            <div className="mt-2">
              <select
                id="operationType"
                className={
                  `block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6`
                }
              >
                <option></option>
                {operations.map((op, i) => (
                  <option key={op.type} value={op.id}>{op.type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="operator1" className="block text-sm font-medium leading-6 text-gray-900">Operator 1</label>
            <div className="mt-2">
              <Input
                type="number"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="operator2" className="block text-sm font-medium leading-6 text-gray-900">Operator 2</label>
            <div className="mt-2">
              <Input />
            </div>
          </div>
          <div className="mt-2 sm:col-span-2 md:col-span-full">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Calculate
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecordForm;
