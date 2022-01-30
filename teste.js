const j = require('./lib')

const api = new j.Jai({
    access_token: 'ad42551e7312487a90c8b3be539caec1',
})

async function main() {
    const res = await api.ids('cc_fraud_supervised', j.JAIModeEnum.COMPLETE);
    console.log(res);
}

main()