import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ax100Component } from './ax100.component';

describe('Ax100Component', () => {
  let component: Ax100Component;
  let fixture: ComponentFixture<Ax100Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ax100Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ax100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
