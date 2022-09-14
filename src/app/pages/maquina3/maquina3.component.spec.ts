import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Maquina3Component } from './maquina3.component';

describe('Maquina3Component', () => {
  let component: Maquina3Component;
  let fixture: ComponentFixture<Maquina3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Maquina3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Maquina3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
