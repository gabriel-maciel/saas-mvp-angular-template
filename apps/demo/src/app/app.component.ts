import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@saas-mvp/ui/primitives';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <ui-header [isAuthenticated]="isAuthenticated" [userName]="userName" />
      <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppComponent {
  // TODO: Replace with actual auth service
  isAuthenticated = false;
  userName = 'John Doe';
}
