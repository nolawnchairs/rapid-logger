
import {
  initLogger,
  createProfile,
  Profile,
  AnsiColors,
  Logger,
} from '..'

describe('Bootstrap', () => {

  it('should find all exported objects', () => {
    expect(initLogger).toBeDefined()
    expect(createProfile).toBeDefined()
    expect(Profile).toBeDefined()
    expect(AnsiColors).toBeDefined()
    expect(Logger).toBeDefined()
  })
})
