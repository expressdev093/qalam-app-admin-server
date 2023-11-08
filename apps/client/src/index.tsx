import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { Spin } from "antd";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "whitesmoke",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      }
    >
      <App />
    </React.Suspense>
  </React.StrictMode>
);
