import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {API_CONFIG} from '../config/api-config-provider';

export const passApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(API_CONFIG);
  const updatedRequest = req.clone({
    setParams: {
      key: config.key
    }
  });

  return next(updatedRequest);
};
