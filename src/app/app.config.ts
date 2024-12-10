import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {apiConfigProvider} from './config/api-config-provider';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {passApiKeyInterceptor} from './services/pass-api-key.interceptor';
import {MessageService} from 'primeng/api';
import {NotificationService} from './services/notification.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([passApiKeyInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura,
      }
    }),
    apiConfigProvider,
    MessageService,
    NotificationService,
  ]
};
