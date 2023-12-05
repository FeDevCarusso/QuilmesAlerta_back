import { createLogger, format, transports } from "winston";
import path from "path";

const logsFolder = path.join(process.cwd(), "/src", "logs");
const loggerOptions = {
  level: "info",
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(logsFolder, "logfile.log"),
      level: "info",
      format: format.combine(format.timestamp(), ),
    }),
  ],
};

const logger = createLogger(loggerOptions);

export default logger;
