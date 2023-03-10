
import { getProfiles } from './config'
import { LogLevel } from './log-level'
import { Profile } from './profile'
import { Memoized } from './util'

/**
 * Represents a function that returns a string.
 */
export type MessageSupplier = () => string

/**
 * The object that is passed to the formatter and handler containing
 * all relevant information about the log entry.
 *
 * @export
 * @interface LogEntry
 */
export interface LogEntry {
  /**
   * The context for each logger instance. Useful for identifying what part of
   * the application is logging the message.
   *
   * @type {string}
   * @memberof LogEntry
   */
  context: string
  /**
   * The timestamp of when the log message was emitted.
   *
   * @type {Date}
   * @memberof LogEntry
   */
  timestamp: Date
  /**
   * The process id of the running application.
   *
   * @type {number}
   * @memberof LogEntry
   */
  pid: number
  /**
   * The log level for this entry
   *
   * @type {LogLevel}
   * @memberof LogEntry
   */
  level: LogLevel
  /**
   * The message to log.
   *
   * @type {string}
   * @memberof LogEntry
   */
  message: string
  /**
   * The optional stack trace provided from and error level log message.
   *
   * @type {string}
   * @memberof LogEntry
   */
  stack?: string
  /**
   * The application name provided in the configuration. Useful when logging
   * to a centralized logging service.
   *
   * @type {string}
   * @memberof LogEntry
   */
  appName?: string
}

/**
 * The interface that represents an instance of a logger
 *
 * @export
 * @interface Logger
 */
export interface LoggerInterface {

  /**
   * Log a message at the verbose level.
   *
   * @param {string} message
   * @memberof LoggerInterface
   */
  verbose(message: string): void
  /**
   * Log a message at the verbose level with deferred evaluation.
   *
   * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
   * @memberof LoggerInterface
   */
  verbose(messageSupplier: MessageSupplier): void
  /**
   * Log a message at the debug level.
   *
   * @param {string} message - The message to log.
   * @memberof LoggerInterface
   */
  debug(message: string): void
  /**
   * Log a message at the debug level with deferred evaluation.
   *
   * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
   * @memberof LoggerInterface
   */
  debug(messageSupplier: MessageSupplier): void
  /**
   * Log a message at the info level.
   *
   * @param {string} message - The message to log.
   * @memberof LoggerInterface
   */
  info(message: string): void
  /**
   * Log a message at the info level with deferred evaluation.
   *
   * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
   * @memberof LoggerInterface
   */
  info(messageSupplier: MessageSupplier): void
  /**
   * Log a message at the warn level.
   *
   * @param {string} message - The message to log.
   * @memberof LoggerInterface
   */
  warn(message: string): void
  /**
   * Log a message at the warn level with deferred evaluation.
   *
   * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
   * @memberof LoggerInterface
   */
  warn(messageSupplier: MessageSupplier): void
  /**
   * Log a message at the error level.
   *
   * @param {string} message - The message to log.
   * @memberof LoggerInterface
   */
  error(message: string): void
  /**
   * Log a message at the error level with a stack trace.
   *
   * @param {string} message - The message to log.
   * @param {string} stack - The accompanying stack trace.
   * @memberof LoggerInterface
   */
  error(message: string, stack: string): void
  /**
   * Log a message at the error level with deferred evaluation.
   *
   * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
   * @memberof LoggerInterface
   */
  error(messageSupplier: MessageSupplier): void
  /**
   * Log a message at the error level with deferred evaluation and a stack trace.
   *
   * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
   * @param {string} stack - The accompanying stack trace.
   * @memberof LoggerInterface
   */
  error(messageSupplier: MessageSupplier, stack: string): void
}

/**
 *
 * @export
 * @class Logger
 * @implements {LoggerInterface}
 */
export class Logger implements LoggerInterface {

  private readonly profiles: Profile[]

  constructor(private readonly context: string, profile?: Profile) {
    this.profiles = profile ? [profile] : getProfiles()
  }

  verbose(argument: string): void
  verbose(messageSupplier: MessageSupplier): void
  verbose(argument: string | MessageSupplier): void {
    this.dump('verbose', argument)
  }

  debug(argument: string): void
  debug(messageSupplier: MessageSupplier): void
  debug(argument: string | MessageSupplier): void {
    this.dump('debug', argument)
  }

  info(argument: string): void
  info(messageSupplier: MessageSupplier): void
  info(argument: string | MessageSupplier): void {
    this.dump('info', argument)
  }

  warn(argument: string): void
  warn(messageSupplier: MessageSupplier): void
  warn(argument: string | MessageSupplier): void {
    this.dump('warn', argument)
  }

  error(message: string): void
  error(message: string, stack: string): void
  error(messageSupplier: MessageSupplier): void
  error(messageSupplier: MessageSupplier, stack: string): void
  error(argument: string | MessageSupplier, stack?: string | MessageSupplier): void {
    this.dump('error', argument, stack)
  }

  /**
   * Runs each logging call through the configured profiles. We use a Promise
   * to ensure that the logging call is asynchronous.
   *
   * @private
   * @param {LogLevel} level
   * @param {(string | MessageSupplier)} message
   * @param {(string | MessageSupplier)} [stack]
   * @return {*}  {Promise<void>}
   * @memberof Logger
   */
  private async dump(level: LogLevel, message: string | MessageSupplier, stack?: string | MessageSupplier): Promise<void> {
    return new Promise<void>(resolve => {
      const messageLatch = new Memoized(() => typeof message === 'string' ? message : message())
      const stackLatch = new Memoized(() => typeof stack === 'string' ? stack : stack ? stack() : undefined)
      for (const profile of this.profiles) {
        if (!profile.isLevelEnabled(level)) {
          return resolve()
        }
        const entry: LogEntry = {
          appName: profile.appName,
          context: this.context,
          timestamp: new Date(),
          pid: process.pid,
          message: messageLatch.get(),
          stack: stackLatch.get(),
          level,
        }
        const formatted = profile.format(entry)
        profile.write(entry, formatted)
      }
      resolve()
    })
  }
}
