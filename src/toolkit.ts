import { AnsiColors } from './formatter'

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
  space: string
  /**
   * A single line feed character.
   *
   * @type {string}
   * @memberof Toolkit
   */
  lf: string
  /**
   * A single carriage return character.
   *
   * @type {string}
   * @memberof Toolkit
   */
  cr: string
  /**
   * Joins a string from the given values
   *
   * @param {...string[]} values - The values to join
   * @return {*}  {string}
   * @memberof Toolkit
   */
  compose(...values: string[]): string
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
  if(maybeString: string | undefined | null, text: (value: string) => string): string
  /**
   * Returns a string with the given number of spaces.
   *
   * @param {number} spaces - The number of spaces to indent by
   * @return {*}  {string}
   * @memberof Toolkit
   */
  indent(spaces: number): string
  /**
   * Returns the given text in ANSI bold.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bold(text: string): string
  /**
   * Returns the given text in ANSI italic.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  italic(text: string): string
  /**
   * Returns the given text with ANSI underline.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  underline(text: string): string
  /**
   * Returns the given text with ANSI strikethrough.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  strikethrough(text: string): string
  /**
   * Returns the given text with ANSI inverse.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  inverse(text: string): string
  /**
   * Returns the given text as hidden.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  hidden(text: string): string
  /**
   * Pads the given text with leading spaces to the given length.
   *
   * @param {string} text - The text to pad
   * @param {number} length - The target length
   * @return {*}  {string}
   * @memberof Toolkit
   */
  padStart(text: string, length: number): string
  /**
   * Pads the given text with trailing spaces to the given length.
   *
   * @param {string} text - The text to pad
   * @param {number} length - The target length
   * @return {*}  {string}
   * @memberof Toolkit
   */
  padEnd(text: string, length: number): string
  /**
   * Returns the given text repeated the given number of times.
   *
   * @param {string} text - The text to repeat
   * @param {number} count - The number of times to repeat
   * @return {*}  {string}
   * @memberof Toolkit
   */
  times(text: string, count: number): string
  /**
   * Returns the given text with the given ANSI color.
   *
   * @param {AnsiColors} color - The ANSI color to use
   * @param {string} text - The text to colorize
   * @return {*}  {string}
   * @memberof Toolkit
   */
  colorize(color: AnsiColors, text: string): string
  /**
   * Returns the given text with ANSI black.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  black(text: string): string
  /**
   * Returns the given text with ANSI red.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  red(text: string): string
  /**
   * Returns the given text with ANSI green.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  green(text: string): string
  /**
   * Returns the given text with ANSI yellow.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  yellow(text: string): string
  /**
   * Returns the given text with ANSI blue.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  blue(text: string): string
  /**
   * Returns the given text with ANSI magenta.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  magenta(text: string): string
  /**
   * Returns the given text with ANSI cyan.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  cyan(text: string): string
  /**
   * Returns the given text with ANSI white.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  white(text: string): string
  /**
   * Returns the given text with ANSI bright black.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  gray(text: string): string
  /**
   * Returns the given text with ANSI bright black.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  brightBlack(text: string): string
  /**
   * Returns the given text with ANSI bright red.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  brightRed(text: string): string
  /**
   * Returns the given text with ANSI bright green.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  brightGreen(text: string): string
  /**
   * Returns the given text with ANSI bright yellow.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  brightYellow(text: string): string
  /**
   * Returns the given text with ANSI bright blue.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  brightBlue(text: string): string
  /**
   * Returns the given text with ANSI bright magenta.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  brightMagenta(text: string): string
  /**
   * Returns the given text with ANSI bright cyan.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  brightCyan(text: string): string
  /**
   * Returns the given text with ANSI bright white.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  brightWhite(text: string): string
  /**
   * Returns the given text with ANSI black background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgBlack(text: string): string
  /**
   * Returns the given text with ANSI red background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgRed(text: string): string
  /**
   * Returns the given text with ANSI green background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgGreen(text: string): string
  /**
   * Returns the given text with ANSI yellow background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgYellow(text: string): string
  /**
   * Returns the given text with ANSI blue background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgBlue(text: string): string
  /**
   * Returns the given text with ANSI magenta background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgMagenta(text: string): string
  /**
   * Returns the given text with ANSI cyan background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgCyan(text: string): string
  /**
   * Returns the given text with ANSI white background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgWhite(text: string): string
  /**
   * Returns the given text with ANSI bright black background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgBrightBlack(text: string): string
  /**
   * Returns the given text with ANSI bright red background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgBrightRed(text: string): string
  /**
   * Returns the given text with ANSI bright green background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgBrightGreen(text: string): string
  /**
   * Returns the given text with ANSI bright yellow background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgBrightYellow(text: string): string
  /**
   * Returns the given text with ANSI bright blue background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgBrightBlue(text: string): string
  /**
   * Returns the given text with ANSI bright magenta background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgBrightMagenta(text: string): string
  /**
   * Returns the given text with ANSI bright cyan background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgBrightCyan(text: string): string
  /**
   * Returns the given text with ANSI bright white background.
   *
   * @param {string} text - The text to format
   * @return {*}  {string}
   * @memberof Toolkit
   */
  bgBrightWhite(text: string): string
}

export const toolkit: Toolkit = {
  space: ' ',
  lf: '\n',
  cr: '\r',
  compose(...operations: string[]): string {
    return operations.join('')
  },
  if(maybeString: string | undefined, text: (value: string) => string): string {
    return maybeString ? text(maybeString) : ''
  },
  indent(spaces: number): string {
    return this.compose(...Array(spaces).fill(this.space))
  },
  bold(text: string): string {
    return `\u001b[1m${text}\u001b[22m`
  },
  italic(text: string): string {
    return `\u001b[3m${text}\u001b[23m`
  },
  underline(text: string): string {
    return `\u001b[4m${text}\u001b[24m`
  },
  strikethrough(text: string): string {
    return `\u001b[9m${text}\u001b[29m`
  },
  inverse(text: string): string {
    return `\u001b[7m${text}\u001b[27m`
  },
  hidden(text: string): string {
    return `\u001b[8m${text}\u001b[28m`
  },
  padStart(text: string, length: number): string {
    return text.padStart(length, ' ')
  },
  padEnd(text: string, length: number): string {
    return text.padEnd(length, ' ')
  },
  times(text: string, count: number): string {
    return text.repeat(count)
  },
  colorize(color: AnsiColors, text: string): string {
    return `${color}${text}${AnsiColors.RESET}`
  },
  black(text: string): string {
    return this.colorize(AnsiColors.BLACK, text)
  },
  red(text: string): string {
    return this.colorize(AnsiColors.RED, text)
  },
  green(text: string): string {
    return this.colorize(AnsiColors.GREEN, text)
  },
  yellow(text: string): string {
    return this.colorize(AnsiColors.YELLOW, text)
  },
  blue(text: string): string {
    return this.colorize(AnsiColors.BLUE, text)
  },
  magenta(text: string): string {
    return this.colorize(AnsiColors.MAGENTA, text)
  },
  cyan(text: string): string {
    return this.colorize(AnsiColors.CYAN, text)
  },
  white(text: string): string {
    return this.colorize(AnsiColors.WHITE, text)
  },
  gray(text: string): string {
    return this.colorize(AnsiColors.GRAY, text)
  },
  brightBlack(text: string): string {
    return this.colorize(AnsiColors.BRIGHT_BLACK, text)
  },
  brightRed(text: string): string {
    return this.colorize(AnsiColors.BRIGHT_RED, text)
  },
  brightGreen(text: string): string {
    return this.colorize(AnsiColors.BRIGHT_GREEN, text)
  },
  brightYellow(text: string): string {
    return this.colorize(AnsiColors.BRIGHT_YELLOW, text)
  },
  brightBlue(text: string): string {
    return this.colorize(AnsiColors.BRIGHT_BLUE, text)
  },
  brightMagenta(text: string): string {
    return this.colorize(AnsiColors.BRIGHT_MAGENTA, text)
  },
  brightCyan(text: string): string {
    return this.colorize(AnsiColors.BRIGHT_CYAN, text)
  },
  brightWhite(text: string): string {
    return this.colorize(AnsiColors.BRIGHT_WHITE, text)
  },
  bgBlack(text: string): string {
    return this.colorize(AnsiColors.BG_BLACK, text)
  },
  bgRed(text: string): string {
    return this.colorize(AnsiColors.BG_RED, text)
  },
  bgGreen(text: string): string {
    return this.colorize(AnsiColors.BG_GREEN, text)
  },
  bgYellow(text: string): string {
    return this.colorize(AnsiColors.BG_YELLOW, text)
  },
  bgBlue(text: string): string {
    return this.colorize(AnsiColors.BG_BLUE, text)
  },
  bgMagenta(text: string): string {
    return this.colorize(AnsiColors.BG_MAGENTA, text)
  },
  bgCyan(text: string): string {
    return this.colorize(AnsiColors.BG_CYAN, text)
  },
  bgWhite(text: string): string {
    return this.colorize(AnsiColors.BG_WHITE, text)
  },
  bgBrightBlack(text: string): string {
    return this.colorize(AnsiColors.BG_BRIGHT_BLACK, text)
  },
  bgBrightRed(text: string): string {
    return this.colorize(AnsiColors.BG_BRIGHT_RED, text)
  },
  bgBrightGreen(text: string): string {
    return this.colorize(AnsiColors.BG_BRIGHT_GREEN, text)
  },
  bgBrightYellow(text: string): string {
    return this.colorize(AnsiColors.BG_BRIGHT_YELLOW, text)
  },
  bgBrightBlue(text: string): string {
    return this.colorize(AnsiColors.BG_BRIGHT_BLUE, text)
  },
  bgBrightMagenta(text: string): string {
    return this.colorize(AnsiColors.BG_BRIGHT_MAGENTA, text)
  },
  bgBrightCyan(text: string): string {
    return this.colorize(AnsiColors.BG_BRIGHT_CYAN, text)
  },
  bgBrightWhite(text: string): string {
    return this.colorize(AnsiColors.BG_BRIGHT_WHITE, text)
  },
}
