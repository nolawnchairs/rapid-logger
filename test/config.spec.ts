import { LogEntry } from '..'
import { configureLogger, getProfile } from '../src/config'
import { toolkit } from '../src/toolkit'

describe('Config', () => {

  let entry: LogEntry

  beforeEach(() => {
    entry = {
      appName: 'test',
      context: 'test',
      timestamp: new Date(),
      pid: process.pid,
      message: 'test',
      stack: undefined,
      level: 'debug',
    }
    configureLogger({
      console: {
        appName: 'test',
        levels: 'DIWE',
      },
      customProfiles: {
        alice: {
          appName: 'alice',
          levels: 'E',
          formatter: () => 'Stuff',
          handler: () => void 0,
        },
        bob: {
          enabled: false,
          appName: 'bob',
          levels: 'I',
          formatter: () => 'Stuff',
          handler: () => void 0,
        },
      },
    })
  })

  it('should configure the default console profile', () => {
    const wrapper = getProfile()
    expect(wrapper).toBeDefined()
    expect(wrapper.appName).toEqual('test')
    expect(wrapper.enabled).toEqual(true)
    expect(wrapper.levels).toBeDefined()
    expect(wrapper.levels).toEqual(['debug', 'info', 'warn', 'error'])
  })

  it('should configure the alice profile', () => {
    const wrapper = getProfile('alice')
    expect(wrapper).toBeDefined()
    expect(wrapper.appName).toEqual('alice')
    expect(wrapper.enabled).toEqual(true)
    expect(wrapper.levels).toBeDefined()
    expect(wrapper.levels).toEqual(['error'])
    expect(wrapper.formatter).toBeDefined()
    expect(wrapper.formatter).toBeInstanceOf(Object)
    expect(wrapper.formatter.format(entry, toolkit)).toBe('Stuff')
    expect(wrapper.handler).toBeDefined()
    expect(wrapper.handler).toBeInstanceOf(Object)
  })

  it('should configure the bob profile', () => {
    const wrapper = getProfile('bob')
    expect(wrapper).toBeDefined()
    expect(wrapper.appName).toEqual('bob')
    expect(wrapper.enabled).toEqual(false)
    expect(wrapper.levels).toBeDefined()
    expect(wrapper.levels).toEqual(['info'])
  })
})
