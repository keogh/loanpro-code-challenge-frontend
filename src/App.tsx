import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './domain/Login';
import HomePage from './domain/Homepage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
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
