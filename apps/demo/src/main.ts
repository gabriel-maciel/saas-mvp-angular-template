import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { FEATURE_FLAGS } from '@saas-mvp/core/config';
import featureFlags from '../../../config/feature-flags.json';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), { provide: FEATURE_FLAGS, useValue: featureFlags }],
}).catch(err => console.error(err));
