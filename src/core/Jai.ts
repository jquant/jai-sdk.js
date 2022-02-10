import DataFrame from 'dataframe-js';
import { chunk, sleep } from '@techmmunity/utils';
import { JAIAuth, JAIConfig } from '../estructures/interfaces';
import { BaseService } from './Base';
import { progressBar } from '../functions/progressBar';
import { JAIDatabaseTypeEnum, JAIModeEnum } from '../estructures/enums';

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

  async names(): Promise<any[]> {
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
    const data = await this.info().then((df) => JSON.parse(df.toJSON()));
    const db_type = data.db_name.find((x: string) => x === name);
    if (db_type) {
      return data.db_type[0];
    } else {
      return `${name} is not a valid name`;
    }
  }

  async generateName(): Promise<any> {
    return 'Not implemented yet';
  }

  async filters(name: string): Promise<any> {
    return this._filters(name);
  }

  async similar(name: string, dt: Array<number> | DataFrame, topK = 5, filters = '', batchSize = 16320): Promise<any> {
    const result: Array<any> = [];
    let chunks: Array<any>;
    let res: any;

    if (dt instanceof Array) {
      chunks = chunk(dt, batchSize);
    } else {
      chunks = chunk(dt.toCollection(), batchSize);
    }

    const total = chunks.length;
    const bar = progressBar(total, 'Similar', this.getUploadSpeed());

    for (const chunk of chunks) {
      if (chunk[0]?.id) {
        const payload = JSON.stringify(chunk);
        res = await this._similarJSON(name, payload, topK, filters);
      } else {
        res = await this._similar(name, chunk, topK, filters);
      }
      bar.next();
      result.push(...res['similarity']);
    }

    bar.next();
    return result;
  }

  async predict(name: string, dt: DataFrame, predictProba = false, asFrame = false, batchSize = 16384): Promise<any> {
    const dtype = await this.getDataBaseType(name);
    const result: Array<any> = [];
    const chunks = chunk(dt.toCollection(), batchSize);
    const total = chunks.length;
    const bar = progressBar(total, 'Predict', this.getUploadSpeed());

    if (dtype != 'Supervised') throw new Error('Predict is only available to dtype Supervised.');

    for (const chunk of chunks) {
      const payload = JSON.stringify(chunk);
      const res = await this._predict(name, payload, predictProba);

      bar.next();
      result.push(...res);
    }

    bar.next();
    return result;
  }

  async ids(name: string, mode = JAIModeEnum.SIMPLE): Promise<any> {
    return this._ids(name, mode);
  }

  async isValid(name: string): Promise<any> {
    const res = await this._is_valid(name);
    return res.value;
  }

  async setup(name: string, 
              data: DataFrame, 
              dbType: JAIDatabaseTypeEnum, 
              batchSize = 16384, 
              frequencySeconds = 1, 
              filterName = '', 
              verbose = 1, 
              args: Record<string, any>): Promise<any> {
    
    const overwrite = args?.overwrite || false;
    const hasEqualName = (await this.names()).filter((x: string) => x === name).length > 0;
    if(hasEqualName){  
      if(overwrite){
        await this.delete(name)
      }else{
        throw new Error(`Database ${name} already exist in your environment. Set overwrite=True to overwrite it.`)
      }
    }else{
      await this.deleteRawData(name);      
    }
    
    const insertResponse = await this.insertData(name, data, dbType, batchSize, filterName);


    return {insertResponse, addDataResponse};
  }


  async addData(name: string, data: DataFrame, batchSize = 16384, frequencySeconds = 1, filterName = ''): Promise<any> {
    
    this.deleteRawData(name);

    const dbType = this.getDataBaseType(name)

    const insertResponse = await this.insertData(name, data, dbType, batchSize, filterName, true)

    // Implementar check ids

    const addDataResponse = await this._append(name)

    return {insertResponse, addDataResponse};
  }


  async fit(): Promise<any> {
    return 'Not implemented yet';
  }

  async delete(name: string): Promise<any> {
    return this._delete_database(name);
  }

  async deleteRawData(name: string): Promise<any> {
    return this._delete_raw_data(name);
  }

  async insertData(name: string, data: DataFrame, dbType: JAIDatabaseTypeEnum, batchSize: number, filterName = '', predict = false): Promise<any> {
    const insertResponse = {}
    const chunks = chunk(data.toCollection(), batchSize);
    const total = chunks.length;
    const bar = progressBar(total, 'Insert', this.getUploadSpeed());

    for (const chunk of chunks) {
      const payload = JSON.stringify(chunk);
      const res = await this._insert_json(name, payload, filterName);
      Object.assign(insertResponse, res)
      bar.next()
    }
    bar.next()
    return insertResponse;
  }

  async checkIdsConsistency(name: string, data: Array<Record<string, any>>): Promise<any> {
    const insertedIds = await this._temp_ids(name);
    if(data.length != insertedIds[0].length){
      throw new Error('The number of ids in the dataframe and the number of ids in the database are different')
    }
  }
}
