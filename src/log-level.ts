
/**
 * The allowed logging levels
 */
export type LogLevel = 'verbose' | 'debug' | 'info' | 'warn' | 'error'

// Map of level characters to their corresponding log level
const levelMappings: Record<string, LogLevel> = {
  V: 'verbose',
  D: 'debug',
  I: 'info',
  W: 'warn',
  E: 'error',
}

/**
 * Parse the shorthand level syntax into an array of log levels
 *
 * @export
 * @param {string} levels
 * @throws {Error} if an invalid level schematic is provided
 * @return {*}  {LogLevel[]}
 */
export function parseLevels(levels: string): LogLevel[] {
  if (!levels.length) {
    throw new Error('No log levels were provided')
  }
  const chars = [...new Set(levels.toUpperCase().split(''))]
  const invalidChars = chars
    .filter(char => !Object.keys(levelMappings).includes(char))
  if (invalidChars.length) {
    throw new Error(`Invalid log level characters: ${invalidChars.join(', ')}`)
  }
  return chars.map(level => levelMappings[level])
}
