import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnInit } from '@angular/core';
import { FeatureFlagsService } from './feature-flags.service';

@Directive({
  selector: '[featureFlag]',
  standalone: true,
})
export class FeatureFlagDirective implements OnInit {
  @Input() featureFlag = '';

  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly featureFlags = inject(FeatureFlagsService);

  ngOnInit(): void {
    if (this.featureFlags.isEnabled(this.featureFlag)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
