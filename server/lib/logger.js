const { createLogger, format, transports } = require('winston');

const {
  combine,
  timestamp,
  label,
  prettyPrint,
} = format;

const createTransports = (config) => {
  const customTransports = [];

  // set the file transport
  if (config.file) {
    // setup the log transport
    customTransports.push(
      new transports.File({
        filename: config.file,
        level: config.level,
      }),
    );
  }
  if (config.console) {
    customTransports.push(
      new transports.Console({
        level: config.level,
      }),
    );
  }
  return customTransports;
};

module.exports = {
  create: (config) => {
    return createLogger({
      transports: createTransports(config),
      format: combine(
        label({
          label: 'Carry-Me API',
        }),
        timestamp(),
        prettyPrint(),
      ),
    });
  },
};
