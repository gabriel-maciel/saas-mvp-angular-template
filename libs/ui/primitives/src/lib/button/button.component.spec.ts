import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant as primary', () => {
    expect(component.variant).toBe('primary');
  });

  it('should have default size as md', () => {
    expect(component.size).toBe('md');
  });

  it('should apply correct classes for primary variant', () => {
    component.variant = 'primary';
    expect(component.buttonClasses).toContain('bg-primary');
    expect(component.buttonClasses).toContain('text-white');
  });

  it('should apply correct classes for small size', () => {
    component.size = 'sm';
    expect(component.buttonClasses).toContain('text-sm');
    expect(component.buttonClasses).toContain('px-3');
  });

  it('should be disabled when disabled prop is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});
