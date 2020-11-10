import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPopupComponent } from './auth-popup.component';

describe('TeamsAuthPopupComponent', () => {
  let component: AuthPopupComponent;
  let fixture: ComponentFixture<AuthPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPopupComponent ]
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
