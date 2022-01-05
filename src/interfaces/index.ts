export interface JAIAuth {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
}
export interface JAIConfig {
  access_token: string;
}
export interface JAIDatabase {
  db_type: 'SelfSupervised' | 'Supervised' | 'Image' | 'FastText' | 'FastText' | 'TextEdit';
}

export interface JAIFieldName {
  field_name: 'text' | 'image_base64'
}

export interface JAISimilar {
  searchByID(name: string, dt: Array<any>, topK?: number, filters?: null | string): Promise<any>;
}

export interface JAIMode {
  mode: 'complete' | 'simple' | 'summarized';
}
