import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import {StatusPage} from "./pages/Status.tsx";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App/>
  },
  {
    path: "/status",
    element: <StatusPage/>
  }
]);
