# Pricing Configuration

## Overview

Pricing plans are centrally managed in `config/pricing.json` to enable easy updates without code changes. This follows the design system principle of configuration-driven architecture.

## File Structure

```
config/
├── pricing.json          # Pricing plans configuration
├── pricing.json.d.ts     # TypeScript type declarations
└── pricing.schema.json   # JSON schema for validation
```

## Configuration Format

### Location

`config/pricing.json`

### Structure

```json
{
  "plans": {
    "plan_id": {
      "id": "plan_id",
      "name": "Plan Name",
      "priceId": "price_xxx",
      "price": "$XX",
      "description": "Plan description",
      "popular": false,
      "contactSales": false
    }
  }
}
```

### Fields

| Field          | Type     | Required | Description                                                      |
| -------------- | -------- | -------- | ---------------------------------------------------------------- |
| `id`           | string   | ✅       | Unique identifier for the plan (must match the key)              |
| `name`         | string   | ✅       | Display name shown in the UI                                     |
| `priceId`      | string   | ✅       | Stripe price ID (e.g., `price_1ABC...`)                          |
| `price`        | string   | ✅       | Display price (e.g., `$29`, `Custom`)                            |
| `description`  | string   | ❌       | Optional plan description for UI                                 |
| `features`     | string[] | ❌       | Optional list of plan features                                   |
| `popular`      | boolean  | ❌       | Highlight as popular/recommended (default: `false`)              |
| `contactSales` | boolean  | ❌       | Requires contacting sales instead of checkout (default: `false`) |

## Usage

### In Components

```typescript
import { PricingPlan } from '@saas-mvp/features/billing';
import pricingConfig from '../../../../../config/pricing.json';

export class PricingComponent {
  readonly plans: Record<string, PricingPlan> = pricingConfig.plans;

  onSelectPlan(planId: string): void {
    const plan = this.plans[planId];

    if (plan.contactSales) {
      // Handle contact sales flow
      return;
    }

    // Proceed with checkout using plan.priceId
  }
}
```

### In Templates

```html
@for (planId of Object.keys(plans); track planId) {
<div class="plan-card" [class.popular]="plans[planId].popular">
  <h3>{{ plans[planId].name }}</h3>
  <p class="price">{{ plans[planId].price }}</p>
  <p class="description">{{ plans[planId].description }}</p>
  <button (click)="onSelectPlan(planId)">
    {{ plans[planId].contactSales ? 'Contact Sales' : 'Subscribe' }}
  </button>
</div>
}
```

## Updating Plans

### 1. Modify Configuration

Edit `config/pricing.json`:

```json
{
  "plans": {
    "new_plan": {
      "id": "new_plan",
      "name": "New Plan",
      "priceId": "price_1XYZ...",
      "price": "$149",
      "description": "Our newest offering",
      "popular": true,
      "contactSales": false
    }
  }
}
```

### 2. Validate Schema

The configuration is validated against `config/pricing.schema.json`. Ensure:

- Plan IDs use lowercase with underscores only (`^[a-z_]+$`)
- All required fields are present
- No additional properties are added

### 3. Update Stripe Integration

For checkout-enabled plans:

1. Create the price in Stripe Dashboard
2. Copy the price ID (format: `price_1ABC...`)
3. Update `priceId` in the config

For contact sales plans:

1. Set `contactSales: true`
2. Implement the contact flow in the component (see TODO)

## Schema Validation

The JSON schema (`pricing.schema.json`) enforces:

- **Plan ID format**: lowercase letters and underscores only
- **Required fields**: `id`, `name`, `priceId`, `price`
- **Type safety**: All fields have defined types
- **No extra properties**: Prevents typos and invalid fields

## Type Safety

TypeScript types are defined in:

- `libs/features/billing/src/lib/models/pricing-plan.model.ts`
- `config/pricing.json.d.ts` (type declarations for JSON import)

This ensures compile-time type checking when accessing plan properties.

## Best Practices

1. **Keep Stripe IDs in config**: Never hardcode price IDs in components
2. **Use feature flags**: For experimental plans, gate them with feature flags
3. **Version control**: Track pricing changes in git for audit trail
4. **Test before deploy**: Verify plan IDs match Stripe before production
5. **Document changes**: Update `CHANGELOG.md` when adding/removing plans

## Migration from Hardcoded Plans

Before:

```typescript
readonly plans = {
  starter: { id: 'starter', name: 'Starter', priceId: 'price_xxx', price: '$29' }
};
```

After:

```typescript
import pricingConfig from '../../../../../config/pricing.json';
readonly plans = pricingConfig.plans;
```

## Related Files

- **Config**: `config/pricing.json`, `config/pricing.schema.json`
- **Types**: `libs/features/billing/src/lib/models/pricing-plan.model.ts`
- **Service**: `libs/features/billing/src/lib/billing.service.ts`
- **Component**: `apps/demo/src/app/pages/pricing/pricing.component.ts`

## Future Enhancements

- [ ] Add currency support for internationalization
- [ ] Support billing intervals (monthly/yearly)
- [ ] Add trial period configuration
- [ ] Implement plan comparison matrix data
- [ ] Add A/B testing support for pricing experiments
