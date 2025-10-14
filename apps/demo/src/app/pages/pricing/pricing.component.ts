import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@saas-mvp/ui/primitives';
import { BillingService, CheckoutResponse, PricingPlan } from '@saas-mvp/features/billing';
import pricingConfig from '@saas-mvp/config/pricing.json';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  private readonly billingService = inject(BillingService);

  // TODO: Replace with actual customer ID from auth service
  private readonly customerId = '123';

  // Plan configurations loaded from config/pricing.json
  readonly plans: Record<string, PricingPlan> = pricingConfig.plans;

  isLoading = false;

  /**
   * Initiates checkout for a selected plan
   */
  onSelectPlan(planId: string): void {
    const plan = this.plans[planId];
    if (!plan) {
      return;
    }

    // Handle contact sales plans differently
    if (plan.contactSales) {
      // TODO: Implement contact sales flow
      return;
    }

    this.isLoading = true;

    const baseUrl = window.location.origin;
    this.billingService
      .createCheckoutSession({
        customerId: this.customerId,
        priceId: plan.priceId,
        successUrl: `${baseUrl}/success`,
        cancelUrl: `${baseUrl}/cancel`,
      })
      .subscribe({
        next: (response: CheckoutResponse) => {
          // Redirect to Stripe checkout
          window.location.href = response.url;
        },
        error: (error: unknown) => {
          this.isLoading = false;
          // TODO: Implement proper error handling with toast/notification
          console.error('Checkout failed:', error);
        },
      });
  }
}
