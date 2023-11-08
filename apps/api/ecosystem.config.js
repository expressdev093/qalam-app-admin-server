module.exports = {
  apps: [
    {
      name: 'qalam-api',
      script: './dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'dev',
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      pid_file: 'pids/app.pid',
    },
  ],
};
