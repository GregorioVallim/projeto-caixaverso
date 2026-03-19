import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignadoComponent } from './consignado.component';

describe('ConsignadoComponent', () => {
  let component: ConsignadoComponent;
  let fixture: ComponentFixture<ConsignadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsignadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
