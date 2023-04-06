
# Rapid Logger

> **Note** - this is a new library and versioned at 0.0.1 at the moment. It works, but not all tests have been written. Once all tests are written, it will be versioned at 1.0.0.

Rapid Logger is a logging library for Node.js that aims to provide fast and efficient logging by only evaluating log messages when the corresponding log level is enabled.

## Installation

```bash
npm install rapid-logger
```
```bash
yarn add rapid-logger
```
```bash
pnpm add rapid-logger
```

## Why Rapid Logger?

Logging is a very important part of any application. However, there are sometimes costs associated with it. Let's take a look at the following example:

```ts
logger.debug(`An error occurred trying to do a thing: ${JSON.stringify(someContext)}`)
```
This does what it's supposed to. It logs a message with some context, in this case, a stringified object. However, it also does a lot of unnecessary work if the debug level is not enabled in production. It stringifies the object, even though it will never be logged. This is a lot of work that could be avoided if we only evaluated the log message only when the debug level is enabled.

The following example shows how to use Rapid Logger to avoid this unnecessary work:

```ts
logger.debug(() => `An error occurred trying to do a thing: ${JSON.stringify(someContext)}`)
```

The magic happens with just six characters: `() => `.

This message is evaluated only when the debug level is enabled. The unnecessary work is avoided in production, where, say, only the error level is enabled. We speed this up even more by wrapping the logic that generates the log message in an asynchronous function that immediately resolves, so your application can continue to run while the log message is being generated.

Not only does this make your application run faster, it uses fewer clock cycles, which means it uses less energy. This is good for the planet... and your wallet if you're running your application on a cloud provider.

## Features

Besides the obvious performance benefits, Rapid Logger also provides the following features we think you'll like:

*  **Simple API:** Rapid Logger provides a simple API that is easy to use and easy to remember.
*  **Customizable:** Rapid Logger is highly customizable. You can define multiple logging profiles, each with their own log levels, formatter and output handlers.
*  **Fully Typed:** Rapid Logger is build with TypeScript, and includes type definitions wtih full inline documentation. This means you get all the benefits of type safety, including auto-completion and compile-time errors.
*  **No Dependencies:** Rapid Logger has no third-party dependencies.

## Usage

The most basic usage:

```ts
import { initLogger, Logger } from 'rapid-logger'

// Initialize the logger, in this case, 
// with the default settings
initLogger()

// Instantiate a new logger
const logger = new Logger()

// Use it!
logger.info('This prints now')
logger.debug(() => 'This will be deferred')
```

### About our Logging Level Schematic

Rapid Logger uses a logging level schematic that uses a single string to define which log levels to use. The string can made up of one or more of the following characters:

*  `E` - Error
*  `W` - Warning
*  `I` - Info
*  `D` - Debug
*  `V` - Verbose

These five characters represent the five log levels. The order of the characters is not important. For example, the following are all valid log level schematics:

*  `E`
*  `EW`
*  `WIE`
*  `DVI`
*  `VDEIW`

> The letters can be in any order and are case-insensitive, however, any invalid characters will cause an error to be thrown. Repeated or duplicate characters are ignored.

### Initialization

To initialize the logger with all the default settings, it's one simple function call:

```ts
initLogger()
```

This will use our default formatter and will write to the console, using `process.stdout` and  `process.stderr`.

The default logging level is `E` for production and `VDIWE` otherwise. The `NODE_ENV` environment variable is used to determine which to use.

You can also define the log level yourself. The `initLogger` also accepts a string value that defines the log level schematic:

```ts
// Only log errors
initLogger('E')

// Or based on the NODE_ENV environment variable
initLogger(
  process.env.NODE_ENV === 'production' ? 'E' : 'VDIWE'
)
```

Finally, you can also pass in a `LoggerConfig` object to customize the logger further if that's your jam:

```ts

initLogger({
  // The 'console' profile is the only one that you're required to define
  // Only the 'levels' property is required
  console: {
    levels: process.env.NODE_ENV === 'production' ? 'E' : 'VDIWE',
    appName: 'awesome-app',
    eol: 'lf'
  },
})
```
In this example, we're setting the levels based on NODE_ENV, giving the application a name (which can be used in the formatter) and setting the end-of-line character to `lf` (which is the default).

The logger is highly modular. If you wish to log to a file or dump to a third-party service, you can define custom profiles for each.

```ts
initLogger({
  // We only care about console logging if in development, so we can
  // disable it in production. Keep those Docker logs clean!
  console: {
    enabled: process.env.NODE_ENV !== 'production',
    levels: 'VDIWE',
    appName: 'awesome-app',
    eol: 'lf'
  },
  // Add as many custom profiles as you want.
  // Index each one by a unique name
  customProfiles: {
    // This one will write warnings and errors to a file
    file: {
      levels: 'WE',
      formatter: (entry) => `${entry.timestamp.toISOString()} | ${entry.level} | ${entry.context} | ${entry.message}`,
      handler: (message) => writeStreamDefinedElsewhere.write(message)
    },
    // Maybe you want to send errors to a third-party service
    // We're only interested in errors, and the service only
    // wants JSON...
    thirdParty: {
      levels: 'E',
      formatter: (entry) => JSON.stringify(entry),
      handler: (message) => {
        thirdPartyService.send(message)
      }
    }
  }
})
```

### Formatters

Formatters take the log entry object containing all the information about the log message and should return the eventual formatted message as a string. We offer both a functional and class-based approach to formatters.

```ts
// Functional approach
export function formatLogMessage(entry: LogEntry, toolkit: Toolkit): string { ... }

initLogger({
  console: {
    levels: process.env.NODE_ENV === 'production' ? 'E' : 'VDIWE',
    formatter: formatLogMessage
  },
})

// Class-based approach
export class MyFormatter implements Formatter {
  format(entry: LogEntry, toolkit: Toolkit): string { ... }
}

initLogger({
  console: {
    levels: process.env.NODE_ENV === 'production' ? 'E' : 'VDIWE',
    formatter: new MyFormatter()
  },
})
```

### Log Entry Object

Each log entry consists of the following fields:

```ts
export interface LogEntry {
  // The name of the logger that created the log entry
  // Useful to differentiate different contexts in your application
  // The context is set via the Logger constructor
  context: string
  // The time the log entry was created
  timestamp: Date
  // The process ID of your running application
  pid: number
  // The log level of the entry
  // One of 'verbose', 'debug', 'info', 'warn', or 'error'
  level: LogLevel
  // The message itself
  message: string
  // The stack trace, if any was provided (only for errors)
  stack?: string
  // The name of the application, if provided via config
  appName?: string
}
```

### Formatting Toolkit

Each call to the `format` function/method is passed a `Toolkit` object. This object contains many useful functions that can be used to format the log message, including ANSI colors, padding, and more.

For example:

```ts
// Map log levels to ANSI colors
const LEVEL_COLORS: Record<LogLevel, AnsiColors> = {
  verbose: AnsiColors.CYAN,
  debug: AnsiColors.MAGENTA,
  info: AnsiColors.GREEN,
  warn: AnsiColors.YELLOW,
  error: AnsiColors.RED,
}

function formatLogMessage(entry: LogEntry, toolkit: Toolkit): string {
  const { level, message, timestamp, pid, context, appName, stack } = entry

  // The 'compose' function is a helper that allows you to
  // compose multiple string together in a fluent manner
  return toolkit.compose(
    // The 'if' function is a helper that only invokes the
    // callback if the test value is not null or undefined
    toolkit.if(appName, appName => toolkit.compose(
      toolkit.blue(`${appName} |`),
      toolkit.space,
    )),
    // All standard ANSI colors are available
    toolkit.brightBlue(timestamp.toISOString()),
    toolkit.space,
    toolkit.gray(pid.toString(10)),
    // Repeating a string is easy
    toolkit.times(toolkit.space, 2),
    // Colors can also be applied like this
    toolkit.colorize(
      LEVEL_COLORS[level],
      // Ensure symmetry by padding the level to the
      // longest level name (verbose)
      toolkit.padStart(level.toUpperCase(), 7)
    ),
    toolkit.space,
    toolkit.gray(`[${context}]`),
    toolkit.space,
    message,
    toolkit.if(stack, () => toolkit.compose(
      toolkit.lf,
      toolkit.colorize(AnsiColors.BRIGHT_RED, '✖'),
      toolkit.space,
      stack,
    )),
  )
}
```

> Note that we're not defining the entire Toolkit API here. The inline documentation
> contains all information about the Toolkit API.

### Handlers

Handlers are responsible for writing the log message to the desired output. We offer both a functional and class-based approach to handlers.

```ts
// Functional approach
export function handleLogMessage(message: string, entry: LogEntry): void | Promise<void> { ... }

initLogger({
  console: {
    levels: process.env.NODE_ENV === 'production' ? 'E' : 'VDIWE',
    handler: handleLogMessage
  },
})

// Class-based approach
export class MyHandler implements Handler {
  handle(message: string, entry: LogEntry): void | Promise<void> { ... }
}

initLogger({
  console: {
    levels: process.env.NODE_ENV === 'production' ? 'E' : 'VDIWE',
    handler: new MyHandler()
  },
})
```

The handler function/method can either be synchronous or asynchronous.