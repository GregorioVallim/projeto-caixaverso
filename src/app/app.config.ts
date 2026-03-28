import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

registerLocaleData(localePt, 'pt-BR');


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideEnvironmentNgxMask(),    
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
};
