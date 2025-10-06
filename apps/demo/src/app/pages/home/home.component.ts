import { Component } from '@angular/core';
import { ButtonComponent } from '@saas-mvp/ui/primitives';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
