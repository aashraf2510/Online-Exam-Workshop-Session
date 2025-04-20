import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { BASE_URL } from 'auth-api';
import { environment } from './env/env.prod';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { tokenReducer } from './store/auth/auth.reducers';
import { AuthEffects } from './store/auth/auth.effects';
import { examReducer } from './store/exam/exam.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: BASE_URL, useValue: environment.apiUrl },
    provideStore({
      token: tokenReducer,
      exam: examReducer,
    }),
    provideEffects(AuthEffects),
  ],
};
