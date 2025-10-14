/**
 * Request payload for creating a checkout session
 */
export interface CheckoutRequest {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

/**
 * Response from checkout session creation
 */
export interface CheckoutResponse {
  sessionId: string;
  url: string;
}
