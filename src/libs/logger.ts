import { createLogger, transports, format } from "winston";
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        // - Write all logs with importance level of `info` or less than it
        new transports.File({ filename: 'logs/info.log', level: 'info' }),
        new transports.Console()
    ],
});

export class MyLogger {

    info(str: string | undefined): void {
        if (str)
            logger.info(str);
    }

    warn(str: string | undefined): void {
        if (str)
            logger.warn(str);
    }

    error(str: string | undefined): void {
        if (str)
            logger.error(str);
    }
};