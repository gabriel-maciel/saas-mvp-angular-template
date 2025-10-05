import { Component } from '@angular/core';
import { ButtonComponent } from '@saas-mvp/ui/primitives';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="space-y-8">
      <section class="text-center">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Welcome to Your SaaS MVP</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          A production-ready Angular 20 + Tailwind template following Trunk-Based Development
          principles.
        </p>
        <div class="flex gap-4 justify-center">
          <ui-button variant="primary" size="lg">Get Started</ui-button>
          <ui-button variant="outline" size="lg">Learn More</ui-button>
        </div>
      </section>

      <section class="grid md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Design System</h3>
          <p class="text-gray-600 mb-4">
            Token-based theming with CSS variables and Tailwind integration.
          </p>
          <ui-button variant="ghost" size="sm">Explore →</ui-button>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Feature Flags</h3>
          <p class="text-gray-600 mb-4">Ship incomplete features safely behind runtime toggles.</p>
          <ui-button variant="ghost" size="sm">Explore →</ui-button>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">CI/CD Ready</h3>
          <p class="text-gray-600 mb-4">
            Lint, test, build, and budget checks enforced in pipeline.
          </p>
          <ui-button variant="ghost" size="sm">Explore →</ui-button>
        </div>
      </section>

      <section class="bg-white p-8 rounded-lg shadow">
        <h3 class="text-2xl font-bold mb-4">Button Variants</h3>
        <div class="flex flex-wrap gap-4">
          <ui-button variant="primary">Primary</ui-button>
          <ui-button variant="secondary">Secondary</ui-button>
          <ui-button variant="outline">Outline</ui-button>
          <ui-button variant="ghost">Ghost</ui-button>
          <ui-button variant="primary" [disabled]="true">Disabled</ui-button>
        </div>
        <h4 class="text-xl font-bold mt-6 mb-4">Button Sizes</h4>
        <div class="flex flex-wrap items-center gap-4">
          <ui-button size="sm">Small</ui-button>
          <ui-button size="md">Medium</ui-button>
          <ui-button size="lg">Large</ui-button>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent {}
