import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { SortieService } from './services/sortie.service';
import { EntreeService } from './services/entree.service';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),provideHttpClient(withFetch()),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([JwtInterceptor])),
    SortieService,
    EntreeService,
    AuthGuard,
    AuthService
  ]
};
