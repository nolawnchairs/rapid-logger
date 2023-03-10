
import { Formatter } from '../src/formatter'
import { LogEntry } from '../src/logger'
import { Toolkit, toolkit } from '../src/toolkit'

class MockFormatter implements Formatter {
  format(entry: LogEntry, toolkit: Toolkit): string {
    return `${entry.appName} | ${entry.timestamp.toISOString()} ${entry.pid} ${entry.level} [${entry.context}] ${entry.message}`
  }

}

describe('Formatter', () => {

  const mockEntry: LogEntry = {
    appName: 'test',
    context: 'test',
    timestamp: new Date('2019-01-01'),
    pid: 1,
    message: 'test',
    stack: 'test',
    level: 'info',
  }

  it('should format correctly using a custom formatter', () => {
    const formatter = new MockFormatter()
    const result = formatter.format(mockEntry, toolkit)
    expect(result).toBe('test | 2019-01-01T00:00:00.000Z 1 info [test] test')
  })

  it('should format correctly using a functional formatter', () => {
    const formatter = (entry: LogEntry, toolkit: Toolkit): string => {
      return `${entry.appName} | ${entry.timestamp.toISOString()} ${entry.pid} ${entry.level} [${entry.context}] ${entry.message}`
    }
    const result = formatter(mockEntry, toolkit)
    expect(result).toBe('test | 2019-01-01T00:00:00.000Z 1 info [test] test')
  })
})
