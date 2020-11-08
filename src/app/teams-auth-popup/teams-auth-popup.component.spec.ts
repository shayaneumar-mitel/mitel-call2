import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsAuthPopupComponent } from './teams-auth-popup.component';

describe('TeamsAuthPopupComponent', () => {
  let component: TeamsAuthPopupComponent;
  let fixture: ComponentFixture<TeamsAuthPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsAuthPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsAuthPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
