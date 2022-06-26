import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObcComponent } from './obc.component';

describe('ObcComponent', () => {
  let component: ObcComponent;
  let fixture: ComponentFixture<ObcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
