import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './domain/Login';
import HomePage from './domain/Homepage';

// process.env.NODE_ENV and process.env.PUBLIC_URL are set by Create React App
// and then replaced with a string when building the project for dev and prod
const basePath = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : '';

const router = createBrowserRouter([
  {
    path: `${basePath}/`,
    element: <HomePage />,
  },
  {
    path: `${basePath}/login`,
    element: <Login />,
  },
]);

const App: React.FC = () => {
  return (
      <div>
        hello
        <RouterProvider router={router} />
      </div>
  );
};

export default App;
