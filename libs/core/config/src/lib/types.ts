export interface FeatureFlag {
  enabled: boolean;
  description: string;
  rolloutPercentage?: number;
}

export interface FeatureFlagsConfig {
  flags: Record<string, FeatureFlag>;
}
