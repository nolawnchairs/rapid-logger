import { initLogger, Logger } from '..'

describe('Logger', () => {

  it('should log with a string literal', () => {
    initLogger()
    const logger = new Logger('Test')
    const spy = jest.spyOn(logger, 'info')
    logger.info('test')
    expect(spy).toBeCalledWith('test')
  })

  it('should log with a deferred function', () => {
    initLogger()
    const logger = new Logger('Test')
    const spy = jest.spyOn(logger, 'info')
    const fn = () => 'test'
    logger.info(fn)
    expect(spy).toBeCalledWith(fn)
  })

})
