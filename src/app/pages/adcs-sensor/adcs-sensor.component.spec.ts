import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADCSSensorComponent } from './adcs-sensor.component';

describe('ADCSSensorComponent', () => {
  let component: ADCSSensorComponent;
  let fixture: ComponentFixture<ADCSSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ADCSSensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ADCSSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
