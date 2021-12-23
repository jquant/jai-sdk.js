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
  db_type: 'SelfSupervised' | 'Supervised' | 'Image';
}

export interface JAISimilar {
  searchByID(name: string, dt: Array<any>, topK?: number, filters?: null | string): Promise<any>;
}
