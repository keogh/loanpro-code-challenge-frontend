import * as React from 'react';
import Input from "../../components/Input";
import {useLoaderData, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import {postRecord} from "../Api";
import ErrorMessage from "../../components/ErrorMessage";
import {useFlash} from "../../components/Flash";

interface IOperation {
  id: number | string;
  name: string;
  type: string;
  cost: number;
}

interface IRecordNewLoader {
  success: boolean;
  operations: IOperation[];
}

interface IRecordFormInput {
  operation_id: string;
  operator1?: string | number | null;
  operator2?: string | number | null;
}

const validationSchema = yup.object({
  operation_id: yup.string().required(),
  operation1: yup.number().nullable(),
  operation2: yup.number().nullable(),
})

const RecordForm = () => {
  const data = useLoaderData() as IRecordNewLoader;
  const operations = data.operations;
  const { addFlash } = useFlash();

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSelectedRandomString, setIsSelectedRandomString] = React.useState(false);
  const [isSelectedSquareRoot, setIsSelectedSquareRoot] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRecordFormInput>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: IRecordFormInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const responseData = await postRecord<IRecordFormInput>(data);

      if (!responseData.success) {
        throw new Error(responseData.error)
      }

      addFlash('Record created successfully', 'success');
      navigate(`/records`);
    } catch (e) {
      // @ts-ignore
      setSubmitError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const selectedOperationId = watch('operation_id');
  React.useEffect(() => {
    const selectedOperation = operations.find(
      (operation) => operation.id === parseInt(selectedOperationId,10)
    )
    if (selectedOperation === undefined) {
      setIsSelectedRandomString(false);
      setIsSelectedSquareRoot(false);
      return;
    }
    setIsSelectedRandomString(selectedOperation.type === 'random_string');
    setIsSelectedSquareRoot(selectedOperation.type === 'square_root');
  }, [selectedOperationId, operations])

  return (
    <div
      className={`
        flex flex-1 flex-col px-6 py-12 
        lg:px-8 md:max-w-[450px]
        ring-1 ring-gray-200 shadow-sm 
        rounded-lg`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register('operation_id', { required: true })}
                className={
                  `block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6`
                }
                disabled={isSubmitting}
              >
                <option value=""></option>
                {operations.map((op, i) => (
                  <option key={op.type} value={op.id}>
                    {op.name} - cost: {op.cost}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="operator1"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {isSelectedRandomString ? 'String length' : 'Operator 1'}
            </label>
            <div className="mt-2">
              <Input
                type="number"
                {...register('operator1')}
                error={!!errors.operator1}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            {!isSelectedRandomString && !isSelectedSquareRoot && (
              <>
                <label htmlFor="operator2" className="block text-sm font-medium leading-6 text-gray-900">Operator 2</label>
                <div className="mt-2">
                  <Input
                    type="number"
                    {...register('operator2')}
                    error={!!errors.operator2}
                    disabled={isSubmitting}
                  />
                </div>
              </>
            )}
          </div>

          {!!submitError && (
            <ErrorMessage
              active={true}
              variant="errorBox"
              className="col-span-full"
            >
              Invalid operation: {submitError}
            </ErrorMessage>
          )}

          <div className="mt-2 sm:col-span-2 md:col-span-full">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isSubmitting}
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
