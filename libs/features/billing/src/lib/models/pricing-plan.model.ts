/**
 * Pricing plan configuration model
 */
export interface PricingPlan {
  /** Unique identifier for the plan */
  id: string;
  /** Display name of the plan */
  name: string;
  /** Stripe price ID (e.g., price_1ABC...) */
  priceId: string;
  /** Display price (e.g., '$29', 'Custom') */
  price: string;
  /** Optional plan description */
  description?: string;
  /** Optional list of plan features */
  features?: string[];
  /** Whether this plan should be highlighted as popular */
  popular?: boolean;
  /** Whether this plan requires contacting sales instead of checkout */
  contactSales?: boolean;
}

/**
 * Pricing configuration structure
 */
export interface PricingConfig {
  plans: Record<string, PricingPlan>;
}
