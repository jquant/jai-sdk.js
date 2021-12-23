import Jai from '../index';

const api = new Jai({
  access_token: 'ad42551e7312487a90c8b3be539caec1',
});

describe('Test for service status', () => {
  it('should return the status from JAI', async () => {
    const response = await api.status();
    expect(response.General).toBeTruthy();
  });
});

describe('Test for getAuth', () => {
  it('should return the auth from JAI', async () => {
    const response = await api.getAuthKey({
      email: 'iagomoraest@gmail.com',
      firstName: 'Alzemiro',
      lastName: 'Thomaz',
      company: '',
    });
    expect(response.status).toBeLessThan(300);
  });
});

describe('Test for similar', () => {
  it('should return similarity result', async () => {
    const data = [1000];
    const response = await api.similar('cc_fraud_supervised', data);
    expect(response.similarity).toBeTruthy();
  });
});
