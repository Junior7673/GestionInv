import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitComponentUpdate } from './produit-component-update';

describe('ProduitComponentUpdate', () => {
  let component: ProduitComponentUpdate;
  let fixture: ComponentFixture<ProduitComponentUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitComponentUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitComponentUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
