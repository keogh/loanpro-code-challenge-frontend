import 'react-data-grid/lib/styles.css';
import React from 'react';
import {createBrowserRouter, RouterProvider, Outlet, useRouteError, Navigate} from 'react-router-dom';
import Login from './domain/Login';
import HomePage from './domain/Homepage';
import AuthWrapper from "./domain/Auth/AuthWrapper";
import {
  RecordDetails,
  RecordNew,
  RecordsList,
  recordNewLoader
} from "./domain/Records";
import {recordsListLoader} from "./domain/Records/loaders";
import {errorCauseList} from "./domain/Api/utils";
import {MainLayout} from "./domain/Layout";

// process.env.NODE_ENV and process.env.PUBLIC_URL are set by Create React App
// and then replaced with a string when building the project for dev and prod
const basePath = process.env.NODE_ENV === 'development' ? '' : process.env.PUBLIC_URL;

const router = createBrowserRouter([
  {
    path: `${basePath}/`,
    element: (
      <AuthWrapper>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </AuthWrapper>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'records',
        element: <RecordsList />,
        loader: recordsListLoader,
      },
      {
        path: 'records/new',
        element: <RecordNew />,
        loader: recordNewLoader,
      },
      {
        path: 'records/:id',
        element: <RecordDetails />,
      },
    ]
  },
  {
    // TODO: Redirect to root "/" if already logged in
    path: `${basePath}/login`,
    element: <Login />,
  },
]);

const App: React.FC = () => {
  return (
      <div>
        <RouterProvider router={router} />
      </div>
  );
};

export default App;

function ErrorBoundary() {
  let error = useRouteError() as Error;

  if (error.cause === errorCauseList.INVALID_TOKEN) {
    return <Navigate to="/login" />
  }

  throw error;
}
