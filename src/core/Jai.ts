import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { JAIAuth, JAIConfig } from '../interfaces';
//@ts-ignore
import { DataFrame } from 'dataframe-js';

export class Jai {
  private authCredentials: JAIConfig;

  /**
   * Class Contructor could be both a JAI Auth or JAI Token
   *
   * @constructs Jai
   * @param {JAIAuth} authCredentials
   * @param {AxiosRequestConfig} authCredentials
   *
   */
  constructor(authCredentials: JAIConfig) {
    this.authCredentials = authCredentials;
  }

  async getAuthKey(data: JAIAuth): Promise<any> {
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

  async names(): Promise<any> {
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

  async info(): Promise<any> {
    return 'Not implemented yet';
  }

  async fields(): Promise<any> {
    return 'Not implemented yet';
  }

  async describe(): Promise<any> {
    return 'Not implemented yet';
  }

  async getDataBaseType(): Promise<any> {
    return 'Not implemented yet';
  }

  async generateName(): Promise<any> {
    return 'Not implemented yet';
  }

  async downloadVectors(): Promise<any> {
    return 'Not implemented yet';
  }

  async filters(): Promise<any> {
    return 'Not implemented yet';
  }

  async similar(
    name: string,
    dt: Array<any>,
    topK?: number,
    filters?: null | string,
    batchSize?: number,
  ): Promise<any> {
    topK = topK || 5;
    filters = filters || null;
    batchSize = batchSize || 16384;
    let results: any[] = [];
    const config: AxiosRequestConfig = {
      params: {
        top_k: topK,
      },
    };
    config.params.filters = filters && filters;
    const df = new DataFrame();
    for (let i = 0; i < df.length; i += batchSize) {
      const _batch = df.slice(i, i + batchSize);
      const _batch2Json = _batch.toJSON();
      const { data } = await this._request()
        .put(`/similar/id/${name}`, _batch2Json, config)
        .catch((err: any) => {
          throw err;
        });
      results = results.concat(data['similarity']);
    }

    return results;
  }

  async predict(name: string, dt: Array<any>, predictProba?: boolean): Promise<any> {
    predictProba = predictProba || false;
    const config: AxiosRequestConfig = {
      params: {
        predict_proba: predictProba,
      },
    };

    const { data } = await this._request().put(`/predict/${name}`, dt, config);
    return data;
  }

  async setup(): Promise<any> {
    return 'Not implemented yet';
  }

  async fit(): Promise<any> {
    return 'Not implemented yet';
  }

  async addData(): Promise<any> {
    return 'Not implemented yet';
  }

  async report(): Promise<any> {
    return 'Not implemented yet';
  }

  /**
   * This method is used to get status form the services running on the JAI API
   *
   * @returns {Promise<Object>}
   */
  async status(): Promise<any> {
    try {
      const { data } = await this._request().get('/status');
      return data;
    } catch (err: any) {
      console.log(err);
    }
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
