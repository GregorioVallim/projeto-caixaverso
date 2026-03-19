import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoPessoalComponent } from './emprestimo-pessoal.component';

describe('EmprestimoPessoalComponent', () => {
  let component: EmprestimoPessoalComponent;
  let fixture: ComponentFixture<EmprestimoPessoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoPessoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmprestimoPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
