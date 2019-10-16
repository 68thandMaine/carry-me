module.exports = () => ({
  app: {
    name: process.env.APP_NAME,
    port: process.env.PORT || 3000,
    environment: process.env.APPLICATION_ENV,
    logpath: process.env.LOG_PATH,
  },
  application_logging: {
    file: process.env.LOG_PATH,
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE || true,
  },
});
