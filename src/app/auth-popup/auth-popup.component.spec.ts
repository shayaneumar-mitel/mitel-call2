import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPopupComponent } from './AuthPopupComponent';

describe('TeamsAuthPopupComponent', () => {
  let component: AuthPopupComponent;
  let fixture: ComponentFixture<AuthPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthPopupComponent],
      providers: [
        { provide: Window, useValue: window }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
