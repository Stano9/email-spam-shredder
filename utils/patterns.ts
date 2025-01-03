export const spamPatterns = [
  /\bbitcoin\b/i, // Matches 'bitcoin' case-insensitively
  /\bethereum\b/i, // Matches 'ethereum' case-insensitively
  /\bdoge\b/i, // Matches 'doge' case-insensitively
  /\bclaim\b.*\bprize\b/i, // Matches claims of prizes
  /\bfree\b.*\bmoney\b/i, // Matches offers of free money

  // "Free" or "No cost" offers that are too good to be true
  /\bfree\b.*\b(prize|gift|money|offer|deal|credit)\b/i,
  /\bno\b.*\b(cost|payment|fees|obligation)\b/i, // "No cost," "No fees," "No payment"

  // "Congratulations, you won" type of messages
  /\b(congratulations|you've won|winner)\b.*\b(prize|cash|gift|reward)\b/i,

  // "Click here" or "Follow this link" phrases
  /\bclick\b.*\b(here|link|below|now)\b/i, // "Click here to claim"
  /\bopen\b.*\bthis link\b/i, // "Open this link now"

  // Investment opportunities, often in crypto or risky stocks
  /\bcrypto\b.*\b(invest|profit|opportunity|trade)\b/i, // Crypto scam patterns
  /\binstant\b.*\bprofit\b.*\binvestment\b/i, // "Instant profit investment"
  /\bget\b.*\brich\b.*\bquick\b/i, // "Get rich quick"

  // "Limited time" offers or urgency tactics
  /\b(limited|exclusive)\b.*\b(offer|deal|time)\b.*\b(expire|hurry|act)\b/i, // "Limited time offer"
  /\bnow\b.*\bonly\b.*\bavailable\b/i, // "Available only now"

  // Phishing attempts using passwords or bank details
  /\bverify\b.*\baccount\b.*\bdetails\b/i, // "Verify your account details"
  /\bupdate\b.*\bpassword\b/i, // "Update your password"
  /\bbank\b.*\baccount\b.*\baccess\b/i, // "Bank account access"
  /\bconfirm\b.*\bidentity\b/i, // "Confirm your identity"

  // Irrelevant or vague promises like "free gifts," "no obligation"
  /\bno\b.*\bstrings\b.*\battached\b/i, // "No strings attached"
  /\bguarantee\b.*\b(prize|money|win|success)\b/i, // "Guaranteed prize"
  /\bexclusive\b.*\boffer\b.*\bonly\b/i, // "Exclusive offer for you"

  // Personal or urgent requests to act fast
  /\burgently\b.*\bneeded\b/i, // "Urgent action required"
  /\bplease\b.*\brespond\b.*\bimmediately\b/i, // "Please respond immediately"

  // Suspicious financial phrases or loan offers
  /\bdebt\b.*\bconsolidation\b.*\bapply\b/i, // "Apply for debt consolidation"
  /\bloan\b.*\bapproval\b.*\binstant\b/i, // "Instant loan approval"
  /\bcredit\b.*\bcard\b.*\bdebt\b/i, // "Credit card debt reduction"

  // Warning or alarming messages to scare the user
  /\b(important|urgent)\b.*\baccount\b.*\balert\b/i, // "Urgent account alert"
  /\byour\b.*\baccount\b.*\bhas\b.*\bbeen\s(suspended|locked|restricted)\b/i, // "Your account has been locked"

  // Phrases suggesting "secret deals" or "hidden offers"
  /\bsecret\b.*\bdeal\b/i, // "Secret deal for you"
  /\bhidden\b.*\btreasure\b/i, // "Hidden treasure" scams

  // Random offers or vague promises like "No obligation"
  /\bno\b.*\bobligation\b/i, // "No obligation required"

  // Miscellaneous phrases often used in spam emails
  /\bcall\b.*\bnow\b.*\bwin\b/i, // "Call now to win"
  /\bplease\b.*\bpay\b.*\bnow\b/i, // "Please pay now"
  /\border\b.*\bnow\b.*\bspecial\b/i, // "Order now for special discount",
  // Free, prize, or gift offers in crypto
  /\bfree\b.*\b(ethereum|bitcoin|dogecoin|crypto|coin|token)\b.*\bgift\b/i, // "Free Ethereum gift"
  /\bno\b.*\bcost\b.*\bbitcoin\b.*\btoken\b/i, // "No cost Bitcoin token"

  // Urgency around crypto investments
  /\bnow\b.*\binvest\b.*\bbitcoin\b/i, // "Invest in Bitcoin now"
  /\bearn\b.*\bfree\b.*\bbitcoin\b/i, // "Earn free Bitcoin"
  /\blimited\b.*\btime\b.*\boffer\b.*\bethereum\b/i, // "Limited time Ethereum offer"

  // Crypto investment opportunities or profits
  /\bethereum\b.*\bprofit\b.*\bguaranteed\b/i, // "Guaranteed Ethereum profits"
  /\bmake\b.*\bquick\b.*\bmoney\b.*\bin\b(ethereum|bitcoin|dogecoin)\b/i, // "Make quick money in Bitcoin"

  // Promises of fast or easy cryptocurrency returns
  /\bget\b.*\brich\b.*\bquick\b.*\bbitcoin\b/i, // "Get rich quick with Bitcoin"
  /\binstant\b.*\bprofit\b.*\bcrypto\b/i, // "Instant profit from crypto"

  // Scams related to crypto mining or giveaways
  /\b(ethereum|bitcoin|dogecoin)\b.*\bmining\b/i, // "Ethereum mining offer"
  /\bfree\b.*\bcrypto\b.*\bmining\b/i, // "Free crypto mining"

  // "You’ve won" or lottery-type crypto scams
  /\bcongratulations\b.*\byou've\b.*\bwon\b.*\b(bitcoin|ethereum|dogecoin)\b/i, // "Congratulations, you’ve won Ethereum!"
  /\bclaim\b.*\bfree\b.*\bbitcoin\b/i, // "Claim your free Bitcoin"

  // Requests to send or deposit crypto
  /\bsend\b.*\b(bitcoin|ethereum|dogecoin)\b.*\bnow\b/i, // "Send Bitcoin now"
  /\bdeposit\b.*\b(ethereum|bitcoin|dogecoin)\b/i, // "Deposit your Bitcoin"

  // Phrases mentioning exchanges or wallets
  /\bwallet\b.*\b(ethereum|bitcoin|dogecoin)\b/i, // "Create your Ethereum wallet"
  /\b(crypto|bitcoin|ethereum)\b.*\bexchange\b/i, // "Exchange Bitcoin now"

  // Phishing for private keys or account details related to crypto
  /\bprivate\skey\b.*\bbitcoin\b/i, // "Your Bitcoin private key"
  /\bwallet\b.*\baddress\b.*\bbitcoin\b/i, // "Your Bitcoin wallet address"
  /\bconfirm\b.*\bcrypto\b.*\baccount\b/i, // "Confirm your crypto account details"

  // "Risk-free" crypto investment claims
  /\bno\b.*\brisk\b.*\bbitcoin\b/i, // "No risk Bitcoin investment"
  /\bguaranteed\b.*\bprofit\b.*\bcrypto\b/i, // "Guaranteed profit with crypto"

  // References to popular altcoins
  /\b(doge|dogecoin|litecoin|ripple|solana|cardano|binance)\b/i, // "Invest in Dogecoin"
  /\b(DOGE|SOL|ADA|BNB)\b.*\binvest/i, // "Invest in SOL or ADA"
]
