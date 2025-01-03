import { checkSpam } from '../src/index'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail: jest.fn(),
}))

describe('Check common scenario', () => {
  it('Common spam email', () => {
    ;(validator.isEmail as jest.Mock).mockReturnValueOnce(true)
    const spamEmail = `<div style="font-size: 14px; line-height: 200%; text-align: left; word-wrap: break-word;">
                            <p style="line-height: 200%;"><strong>Congratulation !! </strong></p>
                            <p style="line-height: 200%;"><strong>You've won 500$ of Ethereum</strong></p>
                            <p style="line-height: 200%;">Scan the QR CODE with your camera to claim 500 $ in your wallet</p>
                            <p style="line-height: 200%;">Attention!! do not give your QR CODE to anyone to benefit from the Hamster Kombat bonus,<br>Don't miss this opportunity to increase your investments!<br>You have 12 hours to redeem this reward on your wallet.<br>The QR CODE will expire and you will no longer be able to request the balance on your walle</p>
                      </div>`
    const validEmail = 'test@example.com'
    const result = checkSpam(validEmail, spamEmail)
    expect(result).toBe(true)
  })
})
