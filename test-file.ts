import { Jai } from './src';
import { DataFrame } from 'dataframe-js';
import { JAIModeEnum } from './src/estructures/enums';

const jai = new Jai({
  access_token: 'ad42551e7312487a90c8b3be539caec1',
});

async function main() {
  const fields = [
    {
      id: 1,
      Time: 0.0976,
      V1: 0.0206,
      V2: 0.0792,
      V3: 0.0213,
      V4: 0.0206,
      V5: 0.0792,
      V6: 0.0213,
      V7: 0.0973,
      V8: 0.115,
      V9: 0.041,
      V10: 0.0827,
      V11: 0.0206,
      V12: 0.0792,
      V13: 0.0213,
      V14: 0.0206,
      V15: 0.0792,
      V16: 0.0213,
      V17: 0.0973,
      V18: 0.115,
      V19: 0.041,
      V20: 0.0827,
      V21: 0.0973,
      V22: 0.115,
      V23: 0.041,
      V24: 0.0827,
      V25: 0.1143,
      V26: 0.0706,
      V27: 0.0556,
      V28: 0.0739,
      Amount: 0.0272,
    },
  ];

  const df = new DataFrame(fields, Object.keys(fields[0]));

  //  const fields2 = await jai.ids('cc_fraud_supervised', { mode: 'complete' });
  // const res1 = await jai.similar('cc_fraud_supervised', fields2);
  const res2 = await jai.predict('cc_fraud_supervised', df);

  console.log(res2);
  //  console.log(res2);
}

async function main2() {
  const res = await jai.ids('cc_fraud_supervised', JAIModeEnum.COMPLETE);
  console.log(res);
}

main();
