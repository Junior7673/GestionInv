import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { SortieService } from './services/sortie.service';
import { EntreeService } from './services/entree.service';
import { JwtInterceptor } from './interceptors/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),provideHttpClient(withFetch()),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    SortieService,
    EntreeService,
     provideHttpClient(withInterceptors([JwtInterceptor])),
  ]
};
