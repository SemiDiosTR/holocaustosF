import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidiosComponent } from './pedidios.component';

describe('PedidiosComponent', () => {
  let component: PedidiosComponent;
  let fixture: ComponentFixture<PedidiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidiosComponent]
    });
    fixture = TestBed.createComponent(PedidiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
