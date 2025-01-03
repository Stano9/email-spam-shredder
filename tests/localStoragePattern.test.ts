import { checkSpam, setPatterns, getStoredPatterns } from '../src/index'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail: jest.fn(),
}))

global.localStorage = {
  store: {},
  getItem: jest.fn((key) => global.localStorage.store[key] || null),
  setItem: jest.fn((key, value) => {
    global.localStorage.store[key] = value
  }),
  clear: jest.fn(() => {
    global.localStorage.store = {}
  }),
} as any

describe('LocalStorage Pattern Management', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('getStoredPatterns', () => {
    it('should return an empty array if no patterns are stored', () => {
      const patterns = getStoredPatterns()
      expect(patterns).toEqual([]) // No patterns stored initially
    })

    it('should return stored patterns as RegExp objects', () => {
      const patternsToStore = [/\bcandy\b/i, /\bstrawberry\b/i]
      setPatterns(patternsToStore)

      const patterns = getStoredPatterns()
      expect(patterns).toHaveLength(2)
      expect(patterns[0]).toEqual(/\bcandy\b/i) // Validates the first pattern
      expect(patterns[1]).toEqual(/\bstrawberry\b/i) // Validates the second pattern
    })

    it('should ignore invalid regex patterns in localStorage', () => {
      const patternsToStore = [/\bcandy\b/i]
      setPatterns(patternsToStore)

      const patterns = getStoredPatterns()
      expect(patterns).toHaveLength(1) // Only valid patterns should be included
      expect(patterns[0]).toEqual(/\bcandy\b/i)
    })
  })

  describe('setPatterns', () => {
    it('should add new patterns to localStorage', () => {
      const newPatterns = [/wood/i, /apple/i]

      setPatterns(newPatterns)

      const stored = getStoredPatterns()
      expect(stored).toBeTruthy()

      expect(stored).toContainEqual(/wood/i)
      expect(stored).toContainEqual(/apple/i)
    })

    it('should not add duplicate patterns to localStorage', () => {
      setPatterns([/free money/i, /free money/i])

      const storedPatterns = getStoredPatterns()
      expect(storedPatterns).toHaveLength(1) // Duplicates should not be added
      expect(storedPatterns[0]).toEqual(/free money/i)
    })
  })

  describe('checkSpam with LocalStorage Patterns', () => {
    beforeEach(() => {
      ;(validator.isEmail as jest.Mock).mockReturnValue(true)
    })

    it('should detect spam content using patterns from localStorage', () => {
      const patterns = [/scam/i, /bitcoin/]
      setPatterns(patterns)

      const spamContent = 'This is a Bitcoin scam!'
      const isSpam = checkSpam('user@example.com', spamContent)

      expect(isSpam).toBe(true) // Matches the custom pattern
    })

    it('should not flag non-spam content using patterns from localStorage', () => {
      const patterns = [/scam/i, /bitcoin/]
      setPatterns(patterns)

      const nonSpamContent = 'Hello, let’s meet for coffee.'
      const isSpam = checkSpam('user@example.com', nonSpamContent)

      expect(isSpam).toBe(false) // Does not match any pattern
    })

    it('should combine localStorage patterns with extended options', () => {
      const storedPatterns = [/free money/i]
      setPatterns(storedPatterns)

      const options = {
        extend: [/urgent/i],
      }

      const spamContent = 'Urgent! Free money is waiting for you!'
      const isSpam = checkSpam('user@example.com', spamContent, options)

      expect(isSpam).toBe(true) // Matches both stored and extended patterns
    })

    it('should prioritize callback function in options', () => {
      const storedPatterns = [/prize/i]
      setPatterns(storedPatterns)

      const callback = jest.fn()

      const options = {
        callback,
      }

      const spamContent = 'Claim your prize now!'
      checkSpam('user@example.com', spamContent, options)

      expect(callback).toHaveBeenCalledWith(true) // Callback should be called with true
    })
  })
})
