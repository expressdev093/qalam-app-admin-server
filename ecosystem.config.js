module.exports = {
  apps: [
    {
      name: "qalam-app-server",
      script: "./apps/api/dist/main.js",

      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "logs/error.log",
      out_file: "logs/out.log",
      pid_file: "pids/app.pid",
    },
  ],
};
