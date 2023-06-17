
/*
  Dev Note:
  Even though this is a TypeScript project, we include the .js extension in the
  import statements below. This is because the TypeScript compiler does not (and
  probably will not) automatically add the .js extension to the import paths when
  compiling to ESM JavaScript. So we have to do it manually so that this library
  can work with CommonJS and ESM applications.

  Yeah, it's stupid, but this is the Node.js ecosystem we're talking about here.
*/

import { initLogger, ProfileConfig } from './config.js'
import { Formatter, FormatterFn, AnsiColors } from './formatter.js'
import { Handler, HandlerFn } from './handler.js'
import { LogLevel } from './log-level.js'
import { LogEntry, Logger, LoggerInterface } from './logger.js'
import { createProfile, Profile, ResolvedProfile } from './profile.js'
import { Toolkit } from './toolkit.js'

export {
  initLogger,
  createProfile,
  ProfileConfig,
  Profile,
  ResolvedProfile,
  Formatter,
  FormatterFn,
  AnsiColors,
  Handler,
  HandlerFn,
  LogLevel,
  LogEntry,
  Logger,
  LoggerInterface,
  Toolkit,
}

export default {
  initLogger,
  createProfile,
}
