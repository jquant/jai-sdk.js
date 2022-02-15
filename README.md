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
