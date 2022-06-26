import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcsComponent } from './adcs.component';

describe('AdcsComponent', () => {
  let component: AdcsComponent;
  let fixture: ComponentFixture<AdcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdcsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
