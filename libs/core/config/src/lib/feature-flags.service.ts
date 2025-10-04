import { Injectable, inject } from '@angular/core';
import { FEATURE_FLAGS } from './feature-flags.token';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagsService {
  private readonly config = inject(FEATURE_FLAGS);

  /**
   * Check if a feature flag is enabled
   * @param flagName - The name of the feature flag
   * @returns true if the flag is enabled, false otherwise
   */
  isEnabled(flagName: string): boolean {
    const flag = this.config.flags[flagName];
    if (!flag) {
      console.warn(`Feature flag "${flagName}" not found. Defaulting to false.`);
      return false;
    }

    // If rollout percentage is defined, use it for gradual rollout
    if (flag.rolloutPercentage !== undefined) {
      const userHash = this.getUserHash();
      return flag.enabled && userHash < flag.rolloutPercentage;
    }

    return flag.enabled;
  }

  /**
   * Get all feature flags
   */
  getAllFlags(): Record<string, boolean> {
    return Object.fromEntries(
      Object.entries(this.config.flags).map(([key, flag]) => [key, flag.enabled])
    );
  }

  /**
   * Simple hash function for gradual rollout
   * In production, you'd use a user ID or session ID
   */
  private getUserHash(): number {
    // For demo purposes, use a random number
    // In production, hash a stable user identifier
    return Math.random() * 100;
  }
}
