import { Injectable, inject } from '@angular/core';
import { ApiService } from '@saas-mvp/core/http';
import { Observable } from 'rxjs';
import { CheckoutRequest, CheckoutResponse } from './models/checkout.model';

/**
 * Service for handling billing operations
 */
@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private readonly api = inject(ApiService);

  /**
   * Creates a checkout session for a subscription plan
   * @param request Checkout request with customer and pricing details
   * @returns Observable with checkout session details
   */
  createCheckoutSession(request: CheckoutRequest): Observable<CheckoutResponse> {
    return this.api.post<CheckoutResponse>('/billing/checkout', request);
  }
}
