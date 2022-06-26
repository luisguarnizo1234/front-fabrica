import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPSCurrentGraphComponent } from './epscurrent-graph.component';

describe('EPSCurrentGraphComponent', () => {
  let component: EPSCurrentGraphComponent;
  let fixture: ComponentFixture<EPSCurrentGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EPSCurrentGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EPSCurrentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
