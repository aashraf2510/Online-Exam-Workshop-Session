import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthApiComponent } from './auth-api.component';

describe('AuthApiComponent', () => {
  let component: AuthApiComponent;
  let fixture: ComponentFixture<AuthApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
