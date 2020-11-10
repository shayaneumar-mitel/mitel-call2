import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SoftphoneLauncherComponent } from './softphone-launcher.component';

describe('SoftphoneLauncherComponent', () => {
  let component: SoftphoneLauncherComponent;
  let fixture: ComponentFixture<SoftphoneLauncherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SoftphoneLauncherComponent],
      providers: [
        { provide: Window, useValue: window }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftphoneLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
