import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Maquina2Component } from './maquina2.component';

describe('Maquina2Component', () => {
  let component: Maquina2Component;
  let fixture: ComponentFixture<Maquina2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Maquina2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Maquina2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
