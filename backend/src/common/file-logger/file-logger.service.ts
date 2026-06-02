import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Service for native File I/O.
 * Writes and reads log data directly to a local file storage medium.
 */
@Injectable()
export class FileLoggerService {
  private readonly logFilePath: string;

  constructor() {
    // Define the log file path relative to project root
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    this.logFilePath = path.join(logsDir, 'system-logs.txt');
  }

  /**
   * Writes a message to the log file.
   * @param {string} message - The message to write.
   */
  public writeLog(message: string): void {
    try {
      const timestamp = new Date().toISOString();
      const logEntry = `[${timestamp}] ${message}\n`;
      // Native File I/O appending
      fs.appendFileSync(this.logFilePath, logEntry, { encoding: 'utf-8' });
    } catch (error) {
      Logger.error('Failed to write to log file', error);
    }
  }

  /**
   * Reads all log data from the file.
   * @returns {string} The complete log contents, or empty string if file doesn't exist.
   */
  public readLogs(): string {
    try {
      if (fs.existsSync(this.logFilePath)) {
        return fs.readFileSync(this.logFilePath, { encoding: 'utf-8' });
      }
      return '';
    } catch (error) {
      Logger.error('Failed to read from log file', error);
      return '';
    }
  }
}
