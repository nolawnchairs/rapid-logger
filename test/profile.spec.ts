import { DefaultFormatter } from '../src/formatter'
import { ConsoleHandler } from '../src/handler'
import { resolveProfile } from '../src/profile'

describe('Profile', () => {

  it('should resolve profile with minimal config', () => {
    const resolved = resolveProfile({
      appName: 'test',
      levels: 'DIWE',
    })
    expect(resolved).toBeDefined()
    expect(resolved.appName).toEqual('test')
    expect(resolved.enabled).toEqual(true)
    expect(resolved.levels).toBeDefined()
    expect(resolved.levels).toEqual(['debug', 'info', 'warn', 'error'])
    expect(resolved.formatter).toBeDefined()
    expect(resolved.formatter).toBeInstanceOf(DefaultFormatter)
    expect(resolved.handler).toBeDefined()
    expect(resolved.handler).toBeInstanceOf(ConsoleHandler)
  })

})
