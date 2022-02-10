import { JAIImageModeEnum, JAIImageModelNameEnum } from "../enums";

export interface JAIAuth {
  email: string
  firstName: string
  lastName: string
  company?: string
}
export interface JAIConfig {
  access_token: string
}

export interface JAISetupParameters {
  overwrite: boolean
  hyperparams: JAIImage
}

export interface JAIImage {
    model_name: JAIImageModelNameEnum,
    mode: JAIImageModeEnum,
    resize_H: number,
    resize_W: number  
}
