// @ts-ignore
import { DataFrame } from 'dataframe-js';
import { chunk, sleep } from '@techmmunity/utils';
import { JAIAuth, JAIConfig } from '../interfaces';
import { BaseService } from './Base';
import { progressBar } from '../functions/progressBar';

export class Jai extends BaseService {
  /**
   * Class Contructor could be both a JAI Auth or JAI Token
   *
   * @constructs Jai
   * @param {JAIAuth} authCredentials
   * @param {AxiosRequestConfig} authCredentials
   *
   */
  constructor(authCredentials: JAIConfig) {
    super(authCredentials);
  }

  async getAuthKey(data: JAIAuth): Promise<any> {
    return await this._getAuthKey(data);
  }

  async names(): Promise<any> {
    return await this._names();
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

  async similar(name: string, dt: Array<any>, topK?: number, filters?: string, batchSize?: number): Promise<any> {
    const _batchSize = batchSize || 1;
    const _topK = topK || 5;
    const _filters = filters || '';
    const result: Array<any> = [];
    const chunks = chunk(dt, _batchSize);
    const total = chunks.length;
    const bar = progressBar(total, 'Similar');

    for(const chunk of chunks) {
      const res = await this._similar(name, chunk, _topK, _filters);  
      bar.next();  
      result.push(...res['similarity']);
    }    
    bar.next();
    return result;
  }

  // async predict(name: string, dt: Array<any>, predictProba?: boolean): Promise<any> {
  //   predictProba = predictProba || false;
  //   const config: AxiosRequestConfig = {
  //     params: {
  //       predict_proba: predictProba,
  //     },
  //   };

  //   const { data } = await this._request().put(`/predict/${name}`, dt, config);
  //   return data;
  // }

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
  // async status(): Promise<any> {
  //   try {
  //     const { data } = await this._request().get('/status');
  //     return data;
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // }
}
