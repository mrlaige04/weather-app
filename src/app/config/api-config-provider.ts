import {InjectionToken, Provider} from '@angular/core';
import {environment} from '../../environments/environment';

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

export interface ApiConfig {
  url: string;
  key: string;
}

export const apiConfigProvider: Provider = {
  provide: API_CONFIG,
  useValue: environment.api as ApiConfig,
}
