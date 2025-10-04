import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="buttonClasses"
      [attr.aria-label]="ariaLabel"
    >
      <ng-content />
    </button>
  `,
  styles: [],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() ariaLabel?: string;

  get buttonClasses(): string {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-primary text-white hover:opacity-90 focus-visible:ring-primary',
      secondary: 'bg-secondary text-white hover:opacity-90 focus-visible:ring-secondary',
      outline:
        'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary',
      ghost: 'text-primary hover:bg-primary/10 focus-visible:ring-primary',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'text-sm px-3 py-1.5 rounded',
      md: 'text-base px-4 py-2 rounded-lg',
      lg: 'text-lg px-6 py-3 rounded-lg',
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]}`;
  }
}
