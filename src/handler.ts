
import { LogEntry } from './logger.js'

/**
  * The function to define a custom handler
  *
  * @param {string} formatted The formatted log entry
  * @param {LogEntry} entry The log entry
 */
export type HandlerFn = (formatted: string, entry: LogEntry) => void | Promise<void>

/**
 * The interface to define a custom handler
 *
 * @export
 * @interface Handler
 */
export interface Handler {
  /**
   * Handle the printing/outlet of the log entry
   *
   * @param {string} formatted The formatted log entry
   * @param {LogEntry} entry The log entry
   * @returns {void | Promise<void>}
   *
   * @type {HandlerFn}
   * @memberof Handler
   */
  handle(formatted: string, entry: LogEntry): void | Promise<void>
}

/**
 * The default console handler that writes to stdout and stderr
 *
 * @export
 * @class ConsoleHandler
 * @implements {Handler}
 */
export class ConsoleHandler implements Handler {
  handle(formatted: string, entry: LogEntry): void {
    if (entry.level === 'error') {
      process.stderr.write(formatted)
    } else {
      process.stdout.write(formatted)
    }
  }
}
