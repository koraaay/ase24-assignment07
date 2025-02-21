import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './taskboard.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from '@angular/platform-browser/animations';

export const taskboardConfig: ApplicationConfig = {
  providers: [
          provideZoneChangeDetection({ eventCoalescing: true }),
          provideRouter(routes),
          provideHttpClient(),
          provideAnimations()
  ]
};
