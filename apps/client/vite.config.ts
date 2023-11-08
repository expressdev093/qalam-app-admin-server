import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import * as dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const cherryPickedKeys = [
  "REACT_APP_NAME",
  "REACT_APP_API_URL",
  "REACT_APP_API_BASE_URL",
  "REACT_APP_API_KEY",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv: Record<string, string> = {};

  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));
  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        "/api": {
          target: "http://localhost:8080", //local nest app
          changeOrigin: true,
          secure: false,
        },
        "/upload": {
          target: "http://localhost:8080", //local nest app
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});

// export default defineConfig({mode}) => {
//   plugins: [react()],
//   // define: {
//   //   "process.env": {},
//   // },
//   // optimizeDeps: {
//   //   esbuildOptions: {
//   //     // Node.js global to browser globalThis
//   //     define: {
//   //       global: "globalThis",
//   //     },
//   //     plugins: [
//   //       NodeGlobalsPolyfillPlugin({
//   //         buffer: true,
//   //         process: true,
//   //       }),
//   //       NodeModulesPolyfillPlugin(),
//   //     ],
//   //   },
//   // },
//   // build: {
//   //   rollupOptions: {
//   //     plugins: [rollupNodePolyFill(), inject({ Buffer: ["buffer", "Buffer"] })],
//   //   },
//   // },
// server: {
//   host: true,
//   proxy: {
//     "/api": {
//       target: "http://localhost:8080", //local nest app
//       changeOrigin: true,
//       secure: false,
//     },
//   },
// },
// };
