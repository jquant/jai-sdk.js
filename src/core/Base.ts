import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { JAIAuth, JAIConfig } from '../interfaces';

export class BaseService {
  private authCredentials: JAIConfig;

  constructor(authCredentials: JAIConfig) {
    this.authCredentials = authCredentials;
  }

  async _getAuthKey(data: JAIAuth): Promise<any> {
    const { email, firstName, lastName, company } = data;
    return await this._request()
      .put('/auth', {
        email: email,
        firstName: firstName,
        lastName: lastName,
        company: company,
      })
      .then((res: any) => {
        return res;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  async _names(): Promise<any> {
    const config: AxiosRequestConfig = {
      params: {
        get_size: true,
      },
    };
    const { data } = await this._request()
      .get('/names', config)
      .catch((err) => {
        throw err;
      });
    return data;
  }

  async _similar(name: string, dt: Array<number>, topK: number, filter?: string): Promise<any> {
    const config: AxiosRequestConfig = {
      params: {
        top_k: topK,
      },
    };
    
    if (filter) config.params.filter = filter;

    const { data } = await this._request()
      .put(`/similar/id/${name}`, dt, config)
      .catch((err: any) => {
        throw err;
      });
    
      return data;
  }

  private _request(): AxiosInstance {
    const { access_token } = this.authCredentials;
    const axiosConfig: AxiosRequestConfig = {
      baseURL: 'https://mycelia.azure-api.net',
      headers: {
        'Content-Type': 'application/json',
        Auth: access_token || '',
      },
    };

    return axios.create(axiosConfig);
  }
}
