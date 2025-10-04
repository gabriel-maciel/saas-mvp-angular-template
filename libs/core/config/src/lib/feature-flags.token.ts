import { InjectionToken } from '@angular/core';
import { FeatureFlagsConfig } from './types';

export const FEATURE_FLAGS = new InjectionToken<FeatureFlagsConfig>('FEATURE_FLAGS');
