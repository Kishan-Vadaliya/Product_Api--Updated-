import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, errors, colorize } = format;

// format for logs
const customFormat = printf(({ level, message, timestamp, stack, module }) => {
    return `${timestamp} [${level.toUpperCase()}] [${module || 'General'}]: ${stack || message}`;
});

// Create Winston logger 
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        customFormat
    ),
    transports: [
        // Console log transport with colors
        new transports.Console({
            format: combine(colorize(), customFormat),
        }),

        // Dynamic log file path (optional)
        new transports.File({
            filename: process.env.NODE_ENV === 'production' ? 'logs/application.log' : 'logs/dev-application.log',
            level: 'info',
        }),

        // Error-specific file logging
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
    ],
});

export default logger;
