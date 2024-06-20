import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteComponent } from './lista-reporte.component';

describe('ListaReporteComponent', () => {
  let component: ListaReporteComponent;
  let fixture: ComponentFixture<ListaReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
