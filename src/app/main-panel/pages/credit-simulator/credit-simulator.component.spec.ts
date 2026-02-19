import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSimulatorComponent } from './credit-simulator.component';

describe('CreditSimulatorComponent', () => {
  let component: CreditSimulatorComponent;
  let fixture: ComponentFixture<CreditSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditSimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
