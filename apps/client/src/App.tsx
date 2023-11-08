import { Refine } from "@refinedev/core";

import { notificationProvider, RefineThemes } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { authProvider } from "./authProvider";

import { ColorModeContextProvider } from "./contexts/color-mode";
import { ConfigProvider } from "antd";
import { Colors } from "./common/contants";
import axiosInstance from "./common/axios";
import dataProvider from "./common/simple-rest";
import { resources } from "./routes/resources";
import { RoutesComponent } from "./routes/routes";
function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          ...RefineThemes.Purple,
          token: {
            colorPrimary: Colors.primary,
          },
        }}
      >
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider(
              process.env.REACT_APP_API_URL ?? "",
              axiosInstance
            )}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            resources={[...resources]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <RoutesComponent />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
