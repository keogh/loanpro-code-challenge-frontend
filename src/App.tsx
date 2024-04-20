import 'react-data-grid/lib/styles.css';
import React from 'react';
import {createBrowserRouter, RouterProvider, Outlet, useRouteError, Navigate} from 'react-router-dom';
import Login from './domain/Login';
import AuthWrapper from "./domain/Auth/AuthWrapper";
import {
  RecordNew,
  RecordsList,
  recordNewLoader
} from "./domain/Records";
import {recordsListLoader} from "./domain/Records/loaders";
import {errorCauseList} from "./domain/Api/utils";
import {MainLayout} from "./domain/Layout";
import {FlashProvider} from "./components/Flash";

const router = createBrowserRouter([
  {
    path: `/`,
    element: (
      <FlashProvider>
        <AuthWrapper>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </AuthWrapper>
      </FlashProvider>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={`/records`} replace />,
      },
      {
        path: 'records',
        element: <RecordsList />,
        loader: recordsListLoader,
      },
      {
        path: 'records/new',
        element: <RecordNew />,
        loader: recordNewLoader,
      }
    ]
  },
  {
    // TODO: Redirect to root "/" if already logged in
    path: `/login`,
    element: <Login />,
  },
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;

function ErrorBoundary() {
  let error = useRouteError() as Error;

  if (error.cause === errorCauseList.INVALID_TOKEN) {
    return <Navigate to={`/login`} replace />
  }

  throw error;
}
