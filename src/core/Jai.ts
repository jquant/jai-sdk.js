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
    return await super._getAuthKey(data);
  }

  async names(): Promise<any> {
    return [...(await super._info())].sort();
  }

  async info(): Promise<any> {
    const data = await super._info();
    const df = new DataFrame(data);
    return df.sortBy('db_name');
  }

  async status(maxTries = 5, patience = 25): Promise<any> {
    let tries = 0;
    while (tries < maxTries) {
      try {
        return this._status();
      } catch (ex) {
        await sleep(patience / maxTries);
        tries++;
      } finally {
        if (tries === maxTries) {
          // eslint-disable-next-line no-unsafe-finally
          throw new Error('Max tries reached');
        }
      }
    }
    return this._status();
  }

  async fields(name: string): Promise<any> {
    return this._fields(name);
  }

  async describe(name: string): Promise<any> {
    return this._describe(name);
  }

  async getDataBaseType(name: string): Promise<any> {
    try {
      const data = await this.info().then((df) => JSON.parse(df.toJSON()));
      const db_type = data.db_name.find((x: string) => x === name);
      if (db_type) {
        return data.db_type[0];
      } else {
        return `${name} is not a valid name`;
      }
    } catch (err: any) {
      throw new Error('Error: ' + err);
    }
  }

  async generateName(): Promise<any> {
    return 'Not implemented yet';
  }

  async downloadVectors(name: string): Promise<any> {
    //Buscar implementação para o Node, pois está retornando um arquivo em python

    const res = await this._download_vectos(name)
    return res;
  }

  async filters(name: string): Promise<any> {
    return this._filters(name);
  }

  async similar(name: string, dt: Array<any>, topK?: number, filters?: string, batchSize?: number): Promise<any> {
    const _batchSize = batchSize || 16320;
    const _topK = topK || 5;
    const _filters = filters || '';
    const result: Array<any> = [];
    const chunks = chunk(dt, _batchSize);
    const total = chunks.length;
    const bar = progressBar(total, 'Similar');

    for (const chunk of chunks) {
      const res = await this._similar(name, chunk, _topK, _filters);
      bar.next();
      result.push(...res['similarity']);
    }
    bar.next();
    return result;
  }

  async predict(
    name: string,
    dt: Array<any>,
    predictProba?: boolean,
    asFrame?: boolean,
    batchSize?: number,
  ): Promise<any> {
    return this._predict(name, dt, predictProba);
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
  // async status(): Promise<any> {
  //   try {
  //     const { data } = await this._request().get('/status');
  //     return data;
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // }
}
