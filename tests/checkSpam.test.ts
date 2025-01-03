import { checkSpam } from '../src/index'
import { CheckSpamOptions } from '../utils/types'
import validator from 'validator'

// Mock validator to focus on the tests for checkSpam
jest.mock('validator', () => ({
  isEmail: jest.fn(),
}))

describe('checkSpam', () => {
  // Mock data
  const validEmail = 'test@example.com'
  const invalidEmail = 'invalid-email'
  const spamContent = [
    'Congratulations! You won free Bitcoin. Claim it now!',
    // 'Claim your Ethereum prize now!',
    // 'You have a chance to win free Dogecoin!',
  ]
  const nonSpamContent = [
    'Hello, this is a regular email.',
    'Just wanted to check in on our project.',
    'Let’s schedule a meeting for next week.',
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test for email validation
  it('should return false for an invalid email', () => {
    // Mock validator.isEmail to return false for invalid email
    ;(validator.isEmail as jest.Mock).mockReturnValueOnce(false)

    const result = checkSpam(invalidEmail, spamContent[0])
    expect(result).toBe(false) // Invalid email should return false
  })

  it('should return true for an email with spam content', () => {
    // Mock validator.isEmail to return true for valid email
    ;(validator.isEmail as jest.Mock).mockReturnValueOnce(true)

    spamContent.forEach((content) => {
      const result = checkSpam(validEmail, content)
      expect(result).toBe(true) // Spam content should return true
    })
  })

  it('should return false for an email with non-spam content', () => {
    ;(validator.isEmail as jest.Mock).mockReturnValueOnce(true)

    nonSpamContent.forEach((content) => {
      const result = checkSpam(validEmail, content)
      expect(result).toBe(false) // Non-spam content should return false
    })
  })

  // Test for custom patterns passed in options.extend
  it('should apply custom patterns passed in options.extend', () => {
    const customPatterns: RegExp[] = [/\bbmw\b.*\bcar\b/i] // Custom pattern for prize claim

    const options: CheckSpamOptions = {
      extend: customPatterns,
    }

    ;(validator.isEmail as jest.Mock).mockReturnValueOnce(true)

    const specificEmail = 'Claim your free bmw car now'
    const result = checkSpam(validEmail, specificEmail, options)
    expect(result).toBe(true)
  })

  it('should call the callback with true for spam content', () => {
    const callback = jest.fn()

    const options: CheckSpamOptions = {
      callback,
    }

    ;(validator.isEmail as jest.Mock).mockReturnValueOnce(true)

    // Calling with spam content
    spamContent.forEach((content) => {
      checkSpam(validEmail, content, options)
      expect(callback).toHaveBeenCalledWith(true) // Ensure callback is called with true for spam content
    })
  })

  it('should call the callback with false for non-spam content', () => {
    const callback = jest.fn()

    const options: CheckSpamOptions = {
      callback,
    }

    ;(validator.isEmail as jest.Mock).mockReturnValueOnce(true)

    // Calling with non-spam content
    nonSpamContent.forEach((content) => {
      checkSpam(validEmail, content, options)
      expect(callback).toHaveBeenCalledWith(false) // Ensure callback is called with false for non-spam content
    })
  })
})
