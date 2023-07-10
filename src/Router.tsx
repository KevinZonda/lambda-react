import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.tsx";
import {StatusPage} from "./pages/Status.tsx";
import {observer} from "mobx-react-lite";
import {ConfigProvider, theme} from "antd";
import {SettingStore} from "./stores";
const {defaultAlgorithm, darkAlgorithm} = theme;

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

export const Entry = observer(() => {
  return (
    <ConfigProvider
      theme={{
        algorithm: SettingStore.DefaultTheme() === 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}>
      <RouterProvider router={router}/>
    </ConfigProvider>
  )
})
