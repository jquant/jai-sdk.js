[![axios](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.npmjs.org/package/axios)
[![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/microsoft/TypeScript)
[![dataframe-js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://gmousse.gitbooks.io/dataframe-js/content/#dataframe-js)

# JAI SDK for NodeJS

# Installation

The source code is currently hosted on GitHub at: [https://github.com/jquant/jai-sdk.js](https://github.com/jquant/jai-sdk.js)

Installing jai-sdk using `npm`:

```npm
npm install jai-sdk.js
```

For more information, here is our [documentation](https://jai-sdk.readthedocs.io/en/latest/).

# [Get your Auth Key](https://jai-sdk.readthedocs.io/en/latest/source/quick_start.html#getting-your-authentication-key)

First, you'll need an Authorization key to use the backend API.

To get a Trial version API using the sdk, fill the values with your information:

```js
const api = new Jai({
  access_token: '<your token>',
});

// to send token to your e-mail

async sendTokenToEmail(){
    return api.getAuthKey({
            email: '<email>',
            firstName: '<firstName>',
            lastName: '<lastName>',
            company: '',
    });
}

sendTokenToEmail();
```

If the response code is 201, then you should be receiving an email with your Auth Key.

# Alpha SDK in Node

This version of the module is currently in alpha and may contain errors.

# 
