import { parseLevels } from '../src/log-level'

describe('LevelParser', () => {

  it('should parse a valid single level schematic', () => {
    expect(parseLevels('I')).toEqual(['info'])
    expect(parseLevels('E')).toEqual(['error'])
    expect(parseLevels('W')).toEqual(['warn'])
    expect(parseLevels('D')).toEqual(['debug'])
    expect(parseLevels('V')).toEqual(['verbose'])
  })

  it('should accept lower-case version of the level schematic', () => {
    expect(parseLevels('i')).toEqual(['info'])
    expect(parseLevels('e')).toEqual(['error'])
    expect(parseLevels('w')).toEqual(['warn'])
    expect(parseLevels('d')).toEqual(['debug'])
    expect(parseLevels('v')).toEqual(['verbose'])
    expect(parseLevels('vid')).toEqual(['verbose', 'info', 'debug'])
    expect(parseLevels('ewd')).toEqual(['error', 'warn', 'debug'])
  })

  it('should parse a valid multi level schematic', () => {
    expect(parseLevels('DI')).toEqual(['debug', 'info'])
    expect(parseLevels('DE')).toEqual(['debug', 'error'])
    expect(parseLevels('DW')).toEqual(['debug', 'warn'])
    expect(parseLevels('EV')).toEqual(['error', 'verbose'])
    expect(parseLevels('IW')).toEqual(['info', 'warn'])
    expect(parseLevels('VDI')).toEqual(['verbose', 'debug', 'info'])
    expect(parseLevels('DEIW')).toEqual(['debug', 'error', 'info', 'warn'])
    expect(parseLevels('EVID')).toEqual(['error', 'verbose', 'info', 'debug'])
  })

  it('should automatically remove duplicate levels', () => {
    expect(parseLevels('EE')).toEqual(['error'])
    expect(parseLevels('VV')).toEqual(['verbose'])
    expect(parseLevels('DDDDDIIIIIIIIIIWWWEWEEEEEE')).toEqual(['debug', 'info', 'warn', 'error'])
  })

  it('should throw an error if an invalid level schematic is provided', () => {
    expect(() => parseLevels('')).toThrowError('No log levels were provided')
    expect(() => parseLevels('X')).toThrowError('Invalid log level characters: X')
    expect(() => parseLevels('XDI')).toThrowError('Invalid log level characters: X')
    expect(() => parseLevels('DIX')).toThrowError('Invalid log level characters: X')
    expect(() => parseLevels('DIXE')).toThrowError('Invalid log level characters: X')
    expect(() => parseLevels('bob')).toThrowError('Invalid log level characters: B, O')
    expect(() => parseLevels('j87s%93m__')).toThrowError('Invalid log level characters: J, 8, 7, S, %, 9, 3, M, _')
    expect(() => parseLevels('DEWDROP')).toThrowError('Invalid log level characters: R, O, P')
  })
})
