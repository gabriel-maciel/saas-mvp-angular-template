import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login button when not authenticated', () => {
    component.isAuthenticated = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Log In');
  });

  it('should show user info when authenticated', () => {
    component.isAuthenticated = true;
    component.userName = 'John Doe';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(component.userInitials).toBe('JD');
  });

  it('should calculate user initials correctly', () => {
    component.userName = 'John Doe';
    expect(component.userInitials).toBe('JD');

    component.userName = 'Alice';
    expect(component.userInitials).toBe('AL');

    component.userName = '';
    expect(component.userInitials).toBe('U');
  });
});
