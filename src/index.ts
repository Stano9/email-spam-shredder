import validator from 'validator'
import { spamPatterns } from '../utils/patterns'
import type { CheckSpamOptions } from '../utils/types'
/**
 * Check if an email address is potentially spammy.
 * @param email - The email address to check.
 * @param content - The email content to check.
 * @returns A boolean indicating whether the email is flagged as spam.
 */
export function checkSpam(
  email: string,
  content: string,
  options?: CheckSpamOptions,
): boolean {
  const combinedPatterns = [...spamPatterns, ...(options?.extend || [])]

  const isValidEmail = validator.isEmail(email)
  if (!isValidEmail) {
    return false
  }

  // Testing the email content
  const isSpam = combinedPatterns.some((pattern) =>
    pattern.test(content.toLowerCase()),
  )

  // If a callback is provided, call it with the result
  if (options?.callback) {
    options.callback(isSpam)
  }

  return isSpam
}

/**
 * Add a new patterns to the localStorage.
 * @param patterns - The regex patterns to add.
 */
export function setPatterns(patterns: RegExp[]): void {
  const storedPatterns = getStoredPatterns()

  const serializedPatterns = patterns.map((pattern) => pattern.toString())

  const uniquePatterns = Array.from(
    new Set([...storedPatterns, ...serializedPatterns]),
  )

  // Save unique patterns back to localStorage
  localStorage.setItem('customSpamPatterns', JSON.stringify(uniquePatterns))
}

/**
 * Retrieve stored patterns from localStorage.
 * @returns An array of RegExp patterns.
 */
export function getStoredPatterns(): RegExp[] {
  const stored = localStorage.getItem('customSpamPatterns')
  if (stored) {
    return JSON.parse(stored)
      .map((pattern: string) => {
        try {
          const match = pattern.match(/^\/(.*)\/([gimuy]*)$/)
          return match ? new RegExp(match[1], match[2]) : null
        } catch {
          return null
        }
      })
      .filter(Boolean) as RegExp[]
  }
  return []
}
