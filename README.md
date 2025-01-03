# Email Spam Shredder ✂️📧

Email Spam Shredder is a light tool designed to detect potentially spammy emails before they are sent in your app via other services.
It uses customizable patterns and validation techniques to ensure your communication stays spam-free.

---

## Features ✨

- 🛡️ **Spam Detection:** Checks if an email address or its content is potentially spammy.
- ⚙️ **Customizable Patterns:** Extend the default spam patterns with your own.
- 🗂️ **LocalStorage Integration:** Save custom patterns for future use.
- 🧠 **Callback Support:** Get notified of the spam check result through a callback.

---

## Installation 🚀

To get started with Email Spam Shredder, simply import and use the functions in your project.

```bash
npm install email-spam-shredder


import { checkSpam } from 'email-spam-shredder';

const email = 'example@spam.com';
const content = 'Free money now! Click here to claim your prize!';
const isSpam = checkSpam(email, content, {
  callback: (result) => {
    console.log(result ? 'Spam detected!' : 'Email is clean');
  },
});

console.log(isSpam); // true or false
```

Contributing 🤝
Feel free to open issues and pull requests to help improve the Email Spam Shredder project! Contributions are always welcome.
