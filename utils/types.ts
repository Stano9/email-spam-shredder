type SpamPattern = RegExp

export interface CheckSpamOptions {
  extend?: SpamPattern[] // Additional custom patterns provided by the user
  callback?: (result: boolean) => void // Callback that will be executed with the result
}
