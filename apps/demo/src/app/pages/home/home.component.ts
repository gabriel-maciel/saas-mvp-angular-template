import { Component } from '@angular/core';
import { ButtonComponent } from '@saas-mvp/ui/primitives';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="text-center">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Welcome to Your SaaS MVP</h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
        A production-ready Angular 20 + Tailwind template following Trunk-Based Development
        principles.
      </p>
      <div class="flex gap-4 justify-center">
        <ui-button variant="primary" size="lg">Get Started</ui-button>
        <ui-button variant="outline" size="lg">Learn More</ui-button>
      </div>
    </div>
  `,
})
export class HomeComponent {}
