import { useState } from "react";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeRecord from "./components/EmployeRecord";
import CreateEmployee from "./components/CreateEmploye";
import EditEmployee from "./components/EditEmployee";
import ErrorPage from "./components/ErrorPage";
import "./App.css";
function AppLayout() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <EmployeRecord />,
      },
      {
        path: "create",
        element: <CreateEmployee />,
      },
      {
        path: "/EditEmployee/:id",
        element: <EditEmployee />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
