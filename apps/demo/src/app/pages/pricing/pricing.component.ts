import { Component } from '@angular/core';
import { ButtonComponent } from '@saas-mvp/ui/primitives';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {}
