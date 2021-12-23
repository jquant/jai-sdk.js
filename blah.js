const jai = require('./lib/index.js').default;

const test = new jai({
    access_token: 'ad42551e7312487a90c8b3be539caec1',
});

async function main() {
    const data = [1000]
    const res = await test.similar('cc_fraud_supervised', data);
    console.log(res);
}

main()