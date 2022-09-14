import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Maquina4Component } from './maquina4.component';

describe('Maquina4Component', () => {
  let component: Maquina4Component;
  let fixture: ComponentFixture<Maquina4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Maquina4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Maquina4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
