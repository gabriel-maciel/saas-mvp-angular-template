interface PricingPlan {
  id: string;
  name: string;
  priceId: string;
  price: string;
  description?: string;
  features?: string[];
  popular?: boolean;
  contactSales?: boolean;
}

interface PricingConfig {
  plans: Record<string, PricingPlan>;
}

declare const pricingConfig: PricingConfig;
export default pricingConfig;
