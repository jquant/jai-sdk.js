import Jai from './src';

const jaizinho = new Jai({
  access_token: 'ad42551e7312487a90c8b3be539caec1',
});

async function main() {  
  const res = await jaizinho.similar('cc_fraud_supervised', [1000, 1001, 1002, 1003]);
  console.log(res);
}

main();
