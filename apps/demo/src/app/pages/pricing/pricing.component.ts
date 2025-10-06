import { Component } from '@angular/core';
import { ButtonComponent } from '@saas-mvp/ui/primitives';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p class="text-xl text-gray-600">Choose the plan that fits your needs</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <!-- Starter Plan -->
        <div class="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h3 class="text-2xl font-bold mb-2">Starter</h3>
          <div class="mb-6">
            <span class="text-4xl font-bold">$29</span>
            <span class="text-gray-600">/month</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> Up to 10 users
            </li>
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> Basic features
            </li>
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> Email support
            </li>
          </ul>
          <ui-button variant="outline" class="w-full">Get Started</ui-button>
        </div>

        <!-- Pro Plan -->
        <div class="bg-white p-8 rounded-lg shadow border-2 border-primary relative">
          <div
            class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold"
          >
            Popular
          </div>
          <h3 class="text-2xl font-bold mb-2">Pro</h3>
          <div class="mb-6">
            <span class="text-4xl font-bold">$99</span>
            <span class="text-gray-600">/month</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> Up to 50 users
            </li>
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> Advanced features
            </li>
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> Priority support
            </li>
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> Custom integrations
            </li>
          </ul>
          <ui-button variant="primary" class="w-full">Get Started</ui-button>
        </div>

        <!-- Enterprise Plan -->
        <div class="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h3 class="text-2xl font-bold mb-2">Enterprise</h3>
          <div class="mb-6">
            <span class="text-4xl font-bold">Custom</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> Unlimited users
            </li>
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> All features
            </li>
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> Dedicated support
            </li>
            <li class="flex items-center text-gray-700">
              <span class="mr-2">✓</span> SLA guarantee
            </li>
          </ul>
          <ui-button variant="outline" class="w-full">Contact Sales</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class PricingComponent {}
