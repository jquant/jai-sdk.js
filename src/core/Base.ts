import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { JAIAuth, JAIConfig } from '../estructures/interfaces';
import { JAIModeEnum } from '../estructures/enums';

export class BaseService {
  private authCredentials: JAIConfig;
  private uploadSpeed: number;

  constructor(authCredentials: JAIConfig) {
    this.authCredentials = authCredentials;
    this.uploadSpeed = 0;
  }

  protected async _getAuthKey(data: JAIAuth): Promise<any> {
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
      });
  }

  protected async _info(mode = JAIModeEnum.COMPLETE, get_size = false): Promise<any> {
    const config: AxiosRequestConfig = {
      params: {
        mode: mode,
        get_size: get_size
      },
    };
    const { data } = await this._request().get('/info', config);

    return data;
  }

  protected async _status(): Promise<any> {
    const { data } = await this._request().get('/status');
    return data;
  }

  protected async _delete_status(name: string): Promise<any> {
    const { data } = await this._request().delete(`/status?db_name=${name}`);
    return data;
  }

  protected async _filters(name: string): Promise<any> {
    const { data } = await this._request().get(`/filters/${name}`);
    return data;
  }

  protected async _names(): Promise<any> {
    const config: AxiosRequestConfig = {
      params: {
        get_size: true,
      },
    };
    const { data } = await this._request().get('/names', config);
    return data;
  }

  protected async _similar(name: string, dt: Array<number>, topK: number, filter?: string): Promise<any> {
    const config: AxiosRequestConfig = {
      params: {
        top_k: topK,
      },
    };
    if (filter) config.params.filter = filter;
    const { data } = await this._request().put(`/similar/id/${name}`, dt, config);
    return data;
  }

  protected async _similarJSON(name: string, dt: string, topK: number, filter?: string): Promise<any> {
    const config: AxiosRequestConfig = {
      params: {
        top_k: topK,
      },
    };
    if (filter) config.params.filter = filter;
    const { data } = await this._request().put(`/similar/data/${name}`, dt, config);
    return data;
  }

  protected async _predict(name: string, dt: string, predictProba?: boolean): Promise<any> {
    predictProba = predictProba || false;
    
    const { data } = await this._request().put(`/predict/${name}?predict_proba=${predictProba}`, dt);

    return data;
  }

  protected async _ids(name: string, mode: JAIModeEnum): Promise<any> {
    const config: AxiosRequestConfig = {
      params: {
        mode: mode
      },
    };

    const { data } = await this._request().get(`/id/${name}`, config);

    return data;
  }

  protected async _is_valid(name: string): Promise<any> {
    const { data } = await this._request().get(`/validation/${name}`);

    return data;
  }

  protected async _append(name: string): Promise<any> {
    const { data } = await this._request().patch(`/data/${name}`);

    return data;
  }

  protected async _insert_json(name: string, dt: string, filter_name?: string): Promise<any> {
    const config: AxiosRequestConfig = {};

    if (filter_name) config.params.filter_name = filter_name;

    const { data } = await this._request().post(`/data/${name}`, dt, config);

    return data;
  }

  protected async _setup(name: string, dt: Record<string, any>, overwrite?: boolean): Promise<any> {
    const config: AxiosRequestConfig = {
      params: {
        overwrite: overwrite || false,
      },
    };
    const { data } = await this._request().post(`/setup/${name}`, dt, config);

    return data;
  }

  protected async _report(name: string, verbose?: number): Promise<any> {
    const config: AxiosRequestConfig = {
      params: {
        verbose: verbose || 2,
      },
    };
    const { data } = await this._request().get(`/report/${name}`, config);

    return data;
  }

  protected async _temp_ids(name: string, mode = JAIModeEnum.SIMPLE): Promise<any> {
    const config: AxiosRequestConfig = {
      params: {
        mode: mode
      },
    };
    const { data } = await this._request().get(`/setup/ids/${name}`, config);

    return data;
  }

  protected async _fields(name: string): Promise<any> {
    const { data } = await this._request().get(`/fields/${name}`);

    return data;
  }

  protected async _describe(name: string): Promise<any> {
    const { data } = await this._request().get(`/describe/${name}`);

    return data;
  }

  protected async _cancel_setup(name: string): Promise<any> {
    const { data } = await this._request().post(`/cancel/${name}`);

    return data;
  }

  protected async _delete_ids(name: string, ids: Array<number>): Promise<any> {
    const { data } = await this._request().delete(`/entity/${name}`, { data: ids });

    return data;
  }

  protected async _delete_raw_data(name: string): Promise<any> {
    const { data } = await this._request().delete(`/data/${name}`);
    return data;
  }

  protected async _delete_database(name: string): Promise<any> {
    const { data } = await this._request().delete(`/database/${name}`);

    return data;
  }

  protected getUploadSpeed(): number {
    return this.uploadSpeed;
  }

  private _request(): AxiosInstance {
    const { access_token } = this.authCredentials;
    const axiosConfig: AxiosRequestConfig = {
      baseURL: 'https://mycelia.azure-api.net',
      headers: {
        'Content-Type': 'application/json',
        Auth: access_token || '',
      },    
      onUploadProgress: progressEvent => console.log(progressEvent.loaded)
    };
    const instance = axios.create(axiosConfig);
    // instance.interceptors.request.use((res) => {
    //   console.log(res);
    // },(error)=>{
    //   console.log(error);
    // });

    instance.interceptors.response.use(
      (response) => response,
      (error: any) => {
        throw new Error(
          `\n \n Error from server with status ${error.response.status}: ${JSON.stringify(
            error.response.data,
            null,
            2,
          )} \n`,
        );
      },
    );
    return instance;
  }
}
