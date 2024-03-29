declare const _default: {
	initLogger: typeof initLogger;
	createProfile: typeof createProfile;
};
/**
 *
 * @export
 * @class Logger
 * @implements {LoggerInterface}
 */
export declare class Logger implements LoggerInterface {
	private readonly context;
	private readonly profiles;
	constructor(context: string, profile?: Profile);
	verbose(argument: string): void;
	verbose(messageSupplier: MessageSupplier): void;
	debug(argument: string): void;
	debug(messageSupplier: MessageSupplier): void;
	info(argument: string): void;
	info(messageSupplier: MessageSupplier): void;
	warn(argument: string): void;
	warn(messageSupplier: MessageSupplier): void;
	error(message: string): void;
	error(message: string, stack: string): void;
	error(messageSupplier: MessageSupplier): void;
	error(messageSupplier: MessageSupplier, stack: string): void;
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
	private dump;
}
/**
 * Concrete implementation of the Profile interface.
 *
 * @export
 * @class ProfileWrapper
 * @implements {Profile}
 */
export declare class Profile {
	readonly enabled: boolean;
	readonly appName?: string;
	readonly levels: LogLevel[];
	readonly formatter: Formatter;
	readonly handler: Handler;
	readonly eol: string;
	constructor(config: ResolvedProfile);
	/**
	 * Determines if the logging level is enabled for this profile.
	 *
	 * @param {LogLevel} level
	 * @return {*}  {boolean}
	 * @memberof ProfileWrapper
	 */
	isLevelEnabled(level: LogLevel): boolean;
	/**
	 * Formats the log entry using the profile's formatter.
	 *
	 * @param {LogEntry} entry
	 * @return {*}  {string}
	 * @memberof ProfileWrapper
	 */
	format(entry: LogEntry): string;
	/**
	 * Writes the formatted log entry using the profile's handler.
	 *
	 * @param {LogEntry} entry
	 * @param {string} formatted
	 * @memberof ProfileWrapper
	 */
	write(entry: LogEntry, formatted: string): void;
}
/**
 * ANSI color codes.
 *
 * @export
 * @enum {number}
 */
export declare enum AnsiColors {
	RESET = "\u001B[0m",
	BLACK = "\u001B[30m",
	GRAY = "\u001B[30;1m",
	WHITE = "\u001B[37m",
	RED = "\u001B[31m",
	GREEN = "\u001B[32m",
	YELLOW = "\u001B[33m",
	BLUE = "\u001B[34m",
	MAGENTA = "\u001B[35m",
	CYAN = "\u001B[36m",
	BRIGHT_RED = "\u001B[31;1m",
	BRIGHT_GREEN = "\u001B[32;1m",
	BRIGHT_YELLOW = "\u001B[33;1m",
	BRIGHT_BLUE = "\u001B[34;1m",
	BRIGHT_MAGENTA = "\u001B[35;1m",
	BRIGHT_CYAN = "\u001B[36;1m",
	BRIGHT_WHITE = "\u001B[37;1m",
	BRIGHT_BLACK = "\u001B[30;1m",
	BG_BLACK = "\u001B[40m",
	BG_RED = "\u001B[41m",
	BG_GREEN = "\u001B[42m",
	BG_YELLOW = "\u001B[43m",
	BG_BLUE = "\u001B[44m",
	BG_MAGENTA = "\u001B[45m",
	BG_CYAN = "\u001B[46m",
	BG_WHITE = "\u001B[47m",
	BG_BRIGHT_RED = "\u001B[41;1m",
	BG_BRIGHT_GREEN = "\u001B[42;1m",
	BG_BRIGHT_YELLOW = "\u001B[43;1m",
	BG_BRIGHT_BLUE = "\u001B[44;1m",
	BG_BRIGHT_MAGENTA = "\u001B[45;1m",
	BG_BRIGHT_CYAN = "\u001B[46;1m",
	BG_BRIGHT_WHITE = "\u001B[47;1m",
	BG_BRIGHT_BLACK = "\u001B[40;1m"
}
/**
 * Create a new custom profile.
 *
 * @export
 * @param {ProfileConfig} config - The profile configuration.
 * @return {*}  {Profile}
 */
export declare function createProfile(config: ProfileConfig): Profile;
/**
 * Bootstraps the logger system with all default settings:
 *
 * * levels: `VDIWE` (all levels) if `NODE_ENV` is `development`, otherwise `E`
 *   (errors only)
 * * enabled: `true`
 * * formatter: `DefaultFormatter`
 * * handler: `ConsoleHandler`
 * * appName: `undefined`
 * * eol: `lf`
 *
 * @export
 */
export declare function initLogger(): void;
/**
 * Configures and bootstraps the logger.
 *
 * @export
 * @param {LoggerConfig} config
 */
export declare function initLogger(config: LoggerConfig): void;
/**
 * Configures and bootstraps the logger. Accepts a log level schematic string using
 * the following characters:
 * * V - verbose
 * * D - debug
 * * I - info
 * * W - warn
 * * E - error
 *
 * Examples:
 * * `VDIWE` will log all levels
 * * `EW` will only log errors and warnings
 *
 * @export
 * @param {string} config
 * @throws {Error} If the log level schematic contains invalid characters
 */
export declare function initLogger(config: string): void;
export interface Formatter {
	/**
	 * Formats a log entry.
	 *
	 * @param {LogEntry} entry - The log entry to format.
	 * @param {Toolkit} toolkit - The toolkit to use for formatting.
	 * @return {*}  {string}
	 * @memberof Formatter
	 */
	format(entry: LogEntry, toolkit: Toolkit): string;
}
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
	handle(formatted: string, entry: LogEntry): void | Promise<void>;
}
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
	context: string;
	/**
	 * The timestamp of when the log message was emitted.
	 *
	 * @type {Date}
	 * @memberof LogEntry
	 */
	timestamp: Date;
	/**
	 * The process id of the running application.
	 *
	 * @type {number}
	 * @memberof LogEntry
	 */
	pid: number;
	/**
	 * The log level for this entry
	 *
	 * @type {LogLevel}
	 * @memberof LogEntry
	 */
	level: LogLevel;
	/**
	 * The message to log.
	 *
	 * @type {string}
	 * @memberof LogEntry
	 */
	message: string;
	/**
	 * The optional stack trace provided from and error level log message.
	 *
	 * @type {string}
	 * @memberof LogEntry
	 */
	stack?: string;
	/**
	 * The application name provided in the configuration. Useful when logging
	 * to a centralized logging service.
	 *
	 * @type {string}
	 * @memberof LogEntry
	 */
	appName?: string;
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
	verbose(message: string): void;
	/**
	 * Log a message at the verbose level with deferred evaluation.
	 *
	 * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
	 * @memberof LoggerInterface
	 */
	verbose(messageSupplier: MessageSupplier): void;
	/**
	 * Log a message at the debug level.
	 *
	 * @param {string} message - The message to log.
	 * @memberof LoggerInterface
	 */
	debug(message: string): void;
	/**
	 * Log a message at the debug level with deferred evaluation.
	 *
	 * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
	 * @memberof LoggerInterface
	 */
	debug(messageSupplier: MessageSupplier): void;
	/**
	 * Log a message at the info level.
	 *
	 * @param {string} message - The message to log.
	 * @memberof LoggerInterface
	 */
	info(message: string): void;
	/**
	 * Log a message at the info level with deferred evaluation.
	 *
	 * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
	 * @memberof LoggerInterface
	 */
	info(messageSupplier: MessageSupplier): void;
	/**
	 * Log a message at the warn level.
	 *
	 * @param {string} message - The message to log.
	 * @memberof LoggerInterface
	 */
	warn(message: string): void;
	/**
	 * Log a message at the warn level with deferred evaluation.
	 *
	 * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
	 * @memberof LoggerInterface
	 */
	warn(messageSupplier: MessageSupplier): void;
	/**
	 * Log a message at the error level.
	 *
	 * @param {string} message - The message to log.
	 * @memberof LoggerInterface
	 */
	error(message: string): void;
	/**
	 * Log a message at the error level with a stack trace.
	 *
	 * @param {string} message - The message to log.
	 * @param {string} stack - The accompanying stack trace.
	 * @memberof LoggerInterface
	 */
	error(message: string, stack: string): void;
	/**
	 * Log a message at the error level with deferred evaluation.
	 *
	 * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
	 * @memberof LoggerInterface
	 */
	error(messageSupplier: MessageSupplier): void;
	/**
	 * Log a message at the error level with deferred evaluation and a stack trace.
	 *
	 * @param {MessageSupplier} messageSupplier - A function that returns the message to log.
	 * @param {string} stack - The accompanying stack trace.
	 * @memberof LoggerInterface
	 */
	error(messageSupplier: MessageSupplier, stack: string): void;
}
/**
 * Profile configuration derived from the user's configuration.
 */
export interface ResolvedProfile {
	enabled: boolean;
	levels: LogLevel[];
	formatter: Formatter | FormatterFn;
	handler: Handler | HandlerFn;
	appName?: string;
	eol?: string;
}
/**
 * Toolkit with helper functions for formatting
 * log messages.
 *
 * @export
 * @interface Toolkit
 */
export interface Toolkit {
	/**
	 * A single space character.
	 *
	 * @type {string}
	 * @memberof Toolkit
	 */
	space: string;
	/**
	 * A single line feed character.
	 *
	 * @type {string}
	 * @memberof Toolkit
	 */
	lf: string;
	/**
	 * A single carriage return character.
	 *
	 * @type {string}
	 * @memberof Toolkit
	 */
	cr: string;
	/**
	 * Joins a string from the given values
	 *
	 * @param {...string[]} values - The values to join
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	compose(...values: string[]): string;
	/**
	 * If the given string is not null or undefined, the given function is called
	 * with the string as argument and the result is returned. Otherwise an empty
	 * string is returned.
	 *
	 * @param {(string | undefined)} maybeString - The string that may be null or undefined
	 * @param {(value: string) => string} text - The function that returns the result if the string is not null or undefined
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	if(maybeString: string | undefined | null, text: (value: string) => string): string;
	/**
	 * Returns a string with the given number of spaces.
	 *
	 * @param {number} spaces - The number of spaces to indent by
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	indent(spaces: number): string;
	/**
	 * Returns the given text in ANSI bold.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bold(text: string): string;
	/**
	 * Returns the given text in ANSI italic.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	italic(text: string): string;
	/**
	 * Returns the given text with ANSI underline.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	underline(text: string): string;
	/**
	 * Returns the given text with ANSI strikethrough.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	strikethrough(text: string): string;
	/**
	 * Returns the given text with ANSI inverse.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	inverse(text: string): string;
	/**
	 * Returns the given text as hidden.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	hidden(text: string): string;
	/**
	 * Pads the given text with leading spaces to the given length.
	 *
	 * @param {string} text - The text to pad
	 * @param {number} length - The target length
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	padStart(text: string, length: number): string;
	/**
	 * Pads the given text with trailing spaces to the given length.
	 *
	 * @param {string} text - The text to pad
	 * @param {number} length - The target length
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	padEnd(text: string, length: number): string;
	/**
	 * Returns the given text repeated the given number of times.
	 *
	 * @param {string} text - The text to repeat
	 * @param {number} count - The number of times to repeat
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	times(text: string, count: number): string;
	/**
	 * Returns the given text with the given ANSI color.
	 *
	 * @param {AnsiColors} color - The ANSI color to use
	 * @param {string} text - The text to colorize
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	colorize(color: AnsiColors, text: string): string;
	/**
	 * Returns the given text with ANSI black.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	black(text: string): string;
	/**
	 * Returns the given text with ANSI red.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	red(text: string): string;
	/**
	 * Returns the given text with ANSI green.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	green(text: string): string;
	/**
	 * Returns the given text with ANSI yellow.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	yellow(text: string): string;
	/**
	 * Returns the given text with ANSI blue.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	blue(text: string): string;
	/**
	 * Returns the given text with ANSI magenta.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	magenta(text: string): string;
	/**
	 * Returns the given text with ANSI cyan.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	cyan(text: string): string;
	/**
	 * Returns the given text with ANSI white.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	white(text: string): string;
	/**
	 * Returns the given text with ANSI bright black.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	gray(text: string): string;
	/**
	 * Returns the given text with ANSI bright black.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	brightBlack(text: string): string;
	/**
	 * Returns the given text with ANSI bright red.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	brightRed(text: string): string;
	/**
	 * Returns the given text with ANSI bright green.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	brightGreen(text: string): string;
	/**
	 * Returns the given text with ANSI bright yellow.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	brightYellow(text: string): string;
	/**
	 * Returns the given text with ANSI bright blue.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	brightBlue(text: string): string;
	/**
	 * Returns the given text with ANSI bright magenta.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	brightMagenta(text: string): string;
	/**
	 * Returns the given text with ANSI bright cyan.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	brightCyan(text: string): string;
	/**
	 * Returns the given text with ANSI bright white.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	brightWhite(text: string): string;
	/**
	 * Returns the given text with ANSI black background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgBlack(text: string): string;
	/**
	 * Returns the given text with ANSI red background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgRed(text: string): string;
	/**
	 * Returns the given text with ANSI green background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgGreen(text: string): string;
	/**
	 * Returns the given text with ANSI yellow background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgYellow(text: string): string;
	/**
	 * Returns the given text with ANSI blue background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgBlue(text: string): string;
	/**
	 * Returns the given text with ANSI magenta background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgMagenta(text: string): string;
	/**
	 * Returns the given text with ANSI cyan background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgCyan(text: string): string;
	/**
	 * Returns the given text with ANSI white background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgWhite(text: string): string;
	/**
	 * Returns the given text with ANSI bright black background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgBrightBlack(text: string): string;
	/**
	 * Returns the given text with ANSI bright red background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgBrightRed(text: string): string;
	/**
	 * Returns the given text with ANSI bright green background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgBrightGreen(text: string): string;
	/**
	 * Returns the given text with ANSI bright yellow background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgBrightYellow(text: string): string;
	/**
	 * Returns the given text with ANSI bright blue background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgBrightBlue(text: string): string;
	/**
	 * Returns the given text with ANSI bright magenta background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgBrightMagenta(text: string): string;
	/**
	 * Returns the given text with ANSI bright cyan background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgBrightCyan(text: string): string;
	/**
	 * Returns the given text with ANSI bright white background.
	 *
	 * @param {string} text - The text to format
	 * @return {*}  {string}
	 * @memberof Toolkit
	 */
	bgBrightWhite(text: string): string;
}
/**
 * A function that formats a log entry.
 *
 * @param {LogEntry} entry - The log entry to format.
 * @param {Toolkit} toolkit - The toolkit to use for formatting.
 */
export type FormatterFn = (entry: LogEntry, toolkit: Toolkit) => string;
/**
  * The function to define a custom handler
  *
  * @param {string} formatted The formatted log entry
  * @param {LogEntry} entry The log entry
 */
export type HandlerFn = (formatted: string, entry: LogEntry) => void | Promise<void>;
/**
 * The allowed logging levels
 */
export type LogLevel = "verbose" | "debug" | "info" | "warn" | "error";
/**
 * The configuration object for the logger.
 */
export type LoggerConfig = {
	/**
	 * The configuration for the default console logger profile. This is the
	 * only profile that is required.
	 *
	 * @type {ProfileConfig}
	 */
	console: ProfileConfig;
	/**
	 * An object containing the configuration for any custom logging profiles.
	 * The key is the name of the profile, and the value is the configuration
	 * object for that profile.
	 *
	 * @type {Record<string, ProfileConfig>}
	 */
	customProfiles?: Record<string, ProfileConfig>;
};
/**
 * Represents a function that returns a string.
 */
export type MessageSupplier = () => string;
export type OptionalConfig = {
	/**
	 * Whether or not this logging profile is enabled. Defaults to `true`.
	 *
	 * @type {boolean}
	 */
	enabled?: boolean;
	/**
	 * The formatter to use for this profile. Defaults to our console formatter.
	 *
	 * Can either be a class instance that implements the `Formatter` interface,
	 * or a function with the signature of `FormatterFn`.
	 *
	 * @type {(Formatter | FormatterFn)}
	 */
	formatter?: Formatter | FormatterFn;
	/**
	 * The handler to use for this profile. Defaults to our default handler.
	 *
	 * Can either be a class instance that implements the `Handler` interface,
	 * or a function with the signature of `HandlerFn`.
	 *
	 * @type {(Handler | HandlerFn)}
	 */
	handler?: Handler | HandlerFn;
	/**
	 * Optional application name. This value, if provided, will be provided to
	 * the formatter as the `appName` property of the `LogEntry` object.
	 *
	 * @type {string}
	 */
	appName?: string;
	/**
	 * The end-of-line character to use. Defaults to `lf`.
	 *
	 * @type {('lf' | 'crlf')}
	 */
	eol?: "lf" | "crlf";
};
/**
 * The configuration object for a logging profile.
 */
export type ProfileConfig = RequiredConfig & OptionalConfig;
export type RequiredConfig = {
	/**
	 * The levels to log. This is a string of characters that map to the
	 * following levels:
	 *
	 * * V - verbose
	 * * D - debug
	 * * I - info
	 * * W - warn
	 * * E - error
	 *
	 * Examples:
	 * * `VDIWE` will log all levels
	 * * `EW` will only log errors and warnings
	 *
	 * @type {string}
	 */
	levels: string;
};

export {
	_default as default,
};

export as namespace RapidLogger;

export {};
