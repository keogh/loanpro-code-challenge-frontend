import * as React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";

type FormData = {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          Username
        </label>
        <div className="mt-2">
          <Input
            id="username"
            type="text"
            autoComplete="username"
            {...register('username', { required: true })}
            variant={!!errors.username ? 'error' : 'primary' }
          />
        </div>
        <ErrorMessage id="username-error" active={!!errors?.username}>
          Username is required
        </ErrorMessage>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
        </div>
        <div className="mt-2">
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password', { required: true })}
            variant={!!errors.password ? 'error' : 'primary' }
          />
          <ErrorMessage id="username-error" active={!!errors?.password}>
            Password is required
          </ErrorMessage>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
