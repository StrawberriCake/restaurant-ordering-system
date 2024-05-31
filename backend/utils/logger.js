import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;

// Define custom format for logs
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create a logger instance
const logger = createLogger({
  level: 'info', // Default log level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(), // Colorize output to console
    customFormat
  ),
  transports: [
    new transports.Console() // Log only to the console
//    new transports.File({ filename: 'application.log' }) // Log to a file
  ],
});

export default logger;
