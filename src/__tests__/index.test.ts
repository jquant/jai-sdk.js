import { Jai } from '../index';

const api = new Jai({
  access_token: '',
});

describe('Test for getAuth', () => {
  it('should return the auth from JAI', async () => {
    const response = await api.getAuthKey({
      email: 'teste@teste.com',
      firstName: 'Teste',
      lastName: 'Teste',
      company: '',
    });
    expect(response.status).toBeLessThan(300)
  })
})


