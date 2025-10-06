import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonComponent],
  template: `
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">S</span>
              </div>
              <span class="text-xl font-bold text-gray-900">SaaS MVP</span>
            </a>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <a
              routerLink="/"
              routerLinkActive="text-primary font-semibold"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </a>
            <a
              routerLink="/pricing"
              routerLinkActive="text-primary font-semibold"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
          </nav>

          <!-- Auth Section -->
          <div class="flex items-center space-x-4">
            @if (isAuthenticated) {
              <div class="flex items-center space-x-3">
                <span class="text-sm text-gray-700">{{ userName }}</span>
                <div
                  class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium"
                >
                  {{ userInitials }}
                </div>
              </div>
            } @else {
              <ui-button variant="outline" size="sm">Log In</ui-button>
            }
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  @Input() isAuthenticated = false;
  @Input() userName = '';

  get userInitials(): string {
    if (!this.userName) return 'U';
    const parts = this.userName.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return this.userName.substring(0, 2).toUpperCase();
  }
}
