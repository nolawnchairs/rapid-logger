
import {
  configureLogger,
  createProfile,
  ProfileWrapper,
  AnsiColors,
  Logger,
} from '..'

describe('Bootstrap', () => {

  it('should find all exported objects', () => {
    expect(configureLogger).toBeDefined()
    expect(createProfile).toBeDefined()
    expect(ProfileWrapper).toBeDefined()
    expect(AnsiColors).toBeDefined()
    expect(Logger).toBeDefined()
  })
})
