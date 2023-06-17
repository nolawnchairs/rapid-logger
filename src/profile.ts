
import { ProfileConfig } from './config.js'
import { DefaultFormatter, Formatter, FormatterFn } from './formatter.js'
import { ConsoleHandler, Handler, HandlerFn } from './handler.js'
import { LogLevel, parseLevels } from './log-level.js'
import { LogEntry } from './logger.js'
import { toolkit } from './toolkit.js'

/**
 * Profile configuration derived from the user's configuration.
 */
export interface ResolvedProfile {
  enabled: boolean
  levels: LogLevel[]
  formatter: Formatter | FormatterFn
  handler: Handler | HandlerFn
  appName?: string
  eol?: string
}

/**
 * Create a new custom profile.
 *
 * @export
 * @param {ProfileConfig} config - The profile configuration.
 * @return {*}  {Profile}
 */
export function createProfile(config: ProfileConfig): Profile {
  return new Profile(
    resolveProfile(config)
  )
}

/**
 * Resolves configuration values to a concrete profile object.
 *
 * @param {ProfileConfig} config
 * @return {*}  {ResolvedProfile}
 */
export function resolveProfile(config: ProfileConfig): ResolvedProfile {
  const { appName, levels, enabled = true, formatter = new DefaultFormatter(), handler = new ConsoleHandler() } = config
  return {
    enabled,
    levels: parseLevels(levels),
    formatter,
    handler,
    appName,
  }
}

/**
 * Concrete implementation of the Profile interface.
 *
 * @export
 * @class ProfileWrapper
 * @implements {Profile}
 */
export class Profile {

  readonly enabled: boolean
  readonly appName?: string
  readonly levels: LogLevel[]
  readonly formatter: Formatter
  readonly handler: Handler
  readonly eol: string

  constructor(config: ResolvedProfile) {

    this.enabled = config.enabled ?? true
    this.appName = config.appName
    this.eol = config.eol === 'crlf' ? '\r' : '\n'
    this.levels = config.levels

    // determine if the formatter is a formatter function or an instance of a
    // formatter class that satisfies the Formatter interface
    if (config.formatter.constructor.name === 'Function') {
      this.formatter = { format: config.formatter as FormatterFn }
    } else {
      this.formatter = config.formatter as Formatter
    }

    // determine if the handler is a handler function or an instance of a
    // handler class that satisfies the Handler interface
    if (config.handler.constructor.name === 'Function') {
      this.handler = { handle: config.handler as HandlerFn }
    } else {
      this.handler = config.handler as Handler
    }
  }

  /**
   * Determines if the logging level is enabled for this profile.
   *
   * @param {LogLevel} level
   * @return {*}  {boolean}
   * @memberof ProfileWrapper
   */
  isLevelEnabled(level: LogLevel): boolean {
    return this.levels.includes(level)
  }

  /**
   * Formats the log entry using the profile's formatter.
   *
   * @param {LogEntry} entry
   * @return {*}  {string}
   * @memberof ProfileWrapper
   */
  format(entry: LogEntry): string {
    return this.formatter.format(entry, toolkit) + this.eol
  }

  /**
   * Writes the formatted log entry using the profile's handler.
   *
   * @param {LogEntry} entry
   * @param {string} formatted
   * @memberof ProfileWrapper
   */
  write(entry: LogEntry, formatted: string): void {
    this.handler.handle(formatted, entry)
  }
}
