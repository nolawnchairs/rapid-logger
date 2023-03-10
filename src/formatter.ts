
import { LogLevel } from './log-level'
import { LogEntry } from './logger'
import { Toolkit } from './toolkit'

/**
 * A function that formats a log entry.
 *
 * @param {LogEntry} entry - The log entry to format.
 * @param {Toolkit} toolkit - The toolkit to use for formatting.
 */
export type FormatterFn = (entry: LogEntry, toolkit: Toolkit) => string

export interface Formatter {
  /**
   * Formats a log entry.
   *
   * @param {LogEntry} entry - The log entry to format.
   * @param {Toolkit} toolkit - The toolkit to use for formatting.
   * @return {*}  {string}
   * @memberof Formatter
   */
  format(entry: LogEntry, toolkit: Toolkit): string
}

/**
 * ANSI color codes.
 *
 * @export
 * @enum {number}
 */
export enum AnsiColors {
  RESET = '\u001b[0m',
  BLACK = '\u001b[30m',
  GRAY = '\u001b[30;1m',
  WHITE = '\u001b[37m',
  RED = '\u001b[31m',
  GREEN = '\u001b[32m',
  YELLOW = '\u001b[33m',
  BLUE = '\u001b[34m',
  MAGENTA = '\u001b[35m',
  CYAN = '\u001b[36m',
  BRIGHT_RED = '\u001b[31;1m',
  BRIGHT_GREEN = '\u001b[32;1m',
  BRIGHT_YELLOW = '\u001b[33;1m',
  BRIGHT_BLUE = '\u001b[34;1m',
  BRIGHT_MAGENTA = '\u001b[35;1m',
  BRIGHT_CYAN = '\u001b[36;1m',
  BRIGHT_WHITE = '\u001b[37;1m',
  BRIGHT_BLACK = '\u001b[30;1m',
  BG_BLACK = '\u001b[40m',
  BG_RED = '\u001b[41m',
  BG_GREEN = '\u001b[42m',
  BG_YELLOW = '\u001b[43m',
  BG_BLUE = '\u001b[44m',
  BG_MAGENTA = '\u001b[45m',
  BG_CYAN = '\u001b[46m',
  BG_WHITE = '\u001b[47m',
  BG_BRIGHT_RED = '\u001b[41;1m',
  BG_BRIGHT_GREEN = '\u001b[42;1m',
  BG_BRIGHT_YELLOW = '\u001b[43;1m',
  BG_BRIGHT_BLUE = '\u001b[44;1m',
  BG_BRIGHT_MAGENTA = '\u001b[45;1m',
  BG_BRIGHT_CYAN = '\u001b[46;1m',
  BG_BRIGHT_WHITE = '\u001b[47;1m',
  BG_BRIGHT_BLACK = '\u001b[40;1m',
}

/**
 * The default formatter we use when none is specified.
 *
 * @export
 * @class DefaultFormatter
 * @implements {Formatter}
 */
export class DefaultFormatter implements Formatter {

  static readonly LEVEL_COLORS: Record<LogLevel, AnsiColors> = {
    verbose: AnsiColors.CYAN,
    debug: AnsiColors.MAGENTA,
    info: AnsiColors.GREEN,
    warn: AnsiColors.YELLOW,
    error: AnsiColors.RED,
  }

  static readonly LEVEL_ABBREVIATIONS: Record<LogLevel, string> = {
    verbose: 'VERB',
    debug: 'DEBUG',
    info: 'INFO',
    warn: 'WARN',
    error: 'ERROR',
  }

  static readonly LEVEL_TEXT_COLORS: Record<LogLevel, AnsiColors> = {
    verbose: AnsiColors.WHITE,
    debug: AnsiColors.WHITE,
    info: AnsiColors.WHITE,
    warn: AnsiColors.YELLOW,
    error: AnsiColors.RED,
  }

  /**
   *
   *
   * @param {LogEntry} entry
   * @param {Toolkit} toolkit
   * @return {*}  {string}
   * @memberof DefaultFormatter
   */
  format(entry: LogEntry, toolkit: Toolkit): string {
    const { level, message, timestamp, pid, context, appName, stack } = entry
    return toolkit.compose(
      toolkit.if(appName, v => toolkit.compose(
        toolkit.colorize(DefaultFormatter.LEVEL_TEXT_COLORS[level], `${v} |`),
        toolkit.space,
      )),
      toolkit.brightBlue(timestamp.toISOString()),
      toolkit.space,
      toolkit.gray(pid.toString(10)),
      toolkit.times(toolkit.space, 2),
      toolkit.colorize(
        DefaultFormatter.LEVEL_COLORS[level],
        toolkit.padStart(DefaultFormatter.LEVEL_ABBREVIATIONS[level], 5)
      ),
      toolkit.space,
      toolkit.gray(`[${context}]`),
      toolkit.space,
      toolkit.colorize(
        DefaultFormatter.LEVEL_TEXT_COLORS[level],
        message
      ),
      toolkit.if(stack, () => toolkit.compose(
        toolkit.lf,
        toolkit.colorize(AnsiColors.BRIGHT_RED, '✖'),
        toolkit.space,
        stack!,
      )),
    )
  }
}
