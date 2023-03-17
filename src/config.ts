
import { BootstrapFormatter, DefaultFormatter, Formatter, FormatterFn } from './formatter'
import { ConsoleHandler, Handler, HandlerFn } from './handler'
import { parseLevels } from './log-level'
import { Logger } from './logger'
import { createProfile, Profile, resolveProfile } from './profile'

type RequiredConfig = {
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
  levels: string
}

type OptionalConfig = {
  /**
   * Whether or not this logging profile is enabled. Defaults to `true`.
   *
   * @type {boolean}
   */
  enabled?: boolean
  /**
   * The formatter to use for this profile. Defaults to our console formatter.
   *
   * Can either be a class instance that implements the `Formatter` interface,
   * or a function with the signature of `FormatterFn`.
   *
   * @type {(Formatter | FormatterFn)}
   */
  formatter?: Formatter | FormatterFn
  /**
   * The handler to use for this profile. Defaults to our default handler.
   *
   * Can either be a class instance that implements the `Handler` interface,
   * or a function with the signature of `HandlerFn`.
   *
   * @type {(Handler | HandlerFn)}
   */
  handler?: Handler | HandlerFn
  /**
   * Optional application name. This value, if provided, will be provided to
   * the formatter as the `appName` property of the `LogEntry` object.
   *
   * @type {string}
   */
  appName?: string
  /**
   * The end-of-line character to use. Defaults to `lf`.
   *
   * @type {('lf' | 'crlf')}
   */
  eol?: 'lf' | 'crlf'
}

/**
 * The configuration object for a logging profile.
 */
export type ProfileConfig = RequiredConfig & OptionalConfig

/**
 * The configuration object for the logger.
 */
type LoggerConfig = {
  /**
   * The configuration for the default console logger profile. This is the
   * only profile that is required.
   *
   * @type {ProfileConfig}
   */
  console: ProfileConfig
  /**
   * An object containing the configuration for any custom logging profiles.
   * The key is the name of the profile, and the value is the configuration
   * object for that profile.
   *
   * @type {Record<string, ProfileConfig>}
   */
  customProfiles?: Record<string, ProfileConfig>
}

// Create bootstrap logger to log errors during initialization
const bootLogger = new Logger('Bootstrap', createProfile({
  levels: 'EWI',
  appName: 'Rapid Logger',
  formatter: new BootstrapFormatter(),
}))

// Registry of profile names to their corresponding profile wrapper
const registry = new Map<string, Profile>()

/**
 * Returns the profile wrapper for the specified profile name.
 *
 * @export
 * @return {*}  {Profile[]}
 */
export function getProfiles(): Profile[] {
  return [...registry.values()]
}

/**
 * Returns a specific profile wrapper
 *
 * @export
 * @param {string} [id=console] - The name of the profile as provided to the configuration
 * @return {*}  {Profile}
 */
export function getProfile(id: string = 'console'): Profile {
  return registry.get(id)
}

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
export function initLogger(): void
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
export function initLogger(config: string): void
/**
 * Configures and bootstraps the logger.
 *
 * @export
 * @param {LoggerConfig} config
 */
export function initLogger(config: LoggerConfig): void
export function initLogger(config?: LoggerConfig | string): void {
  if (registry.size > 0) {
    bootLogger.warn('Logger already initialized at least once. Initializing again with current settings... surely this wasn\'t intentional.')
  }
  registry.clear()
  if (!config) {
    registry.set(
      'console',
      new Profile({
        enabled: true,
        levels: parseLevels(process.env.NODE_ENV === 'development' ? 'VDIWE' : 'E'),
        formatter: new DefaultFormatter(),
        handler: new ConsoleHandler(),
        eol: 'lf',
      })
    )
    return
  }

  if (typeof config === 'string') {
    registry.set(
      'console',
      new Profile({
        enabled: true,
        levels: parseLevels(config),
        formatter: new DefaultFormatter(),
        handler: new ConsoleHandler(),
        eol: 'lf',
      })
    )
    return
  }

  const { console, customProfiles = {} } = config
  const resolved = resolveProfile(console)
  registry.set('console', new Profile(resolved))

  for (const [name, profile] of Object.entries(customProfiles)) {
    registry.set(name, new Profile(resolveProfile(profile)))
  }
}
