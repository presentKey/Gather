import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/normalize.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NotFound from './pages/NotFound/NotFound';
import Main from './components/Main/Main';
import Login from './pages/Login/Login';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import Detail from './pages/Detail/Detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: '/detail', element: <Detail /> },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
