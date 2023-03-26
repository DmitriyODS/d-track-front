import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/errorPage/ErrorPage';
import { UrlPages } from './globals/urlPages';

const Auth = lazy(() => import('./pages/auth/Auth'));
const Home = lazy(() => import('./pages/home/Home'));
const Claims = lazy(() => import('./pages/claims/Claims'));
const Customers = lazy(() => import('./pages/customers/Customers'));
const Employees = lazy(() => import('./pages/employees/Employees'));
const ProcessesClaims = lazy(
  () => import('./pages/processesClaims/ProcessesClaims')
);
const TaskBoard = lazy(() => import('./pages/taskBoard/TaskBoard'));
const Tasks = lazy(() => import('./pages/tasks/Tasks'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: UrlPages.Claims,
        element: <Claims />,
      },
      {
        path: UrlPages.Customers,
        element: <Customers />,
      },
      {
        path: UrlPages.Employees,
        element: <Employees />,
      },
      {
        path: UrlPages.ProcessesClaims,
        element: <ProcessesClaims />,
      },
      {
        path: UrlPages.TaskBoard,
        element: <TaskBoard />,
      },
      {
        path: UrlPages.Tasks,
        element: <Tasks />,
      },
    ],
  },
  {
    path: UrlPages.Auth,
    element: <Auth />,
  },
]);

export default router;
