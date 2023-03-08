import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/normalize.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <Main /> }],
  },
  {
    path: 'login',
    element: <Login />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
