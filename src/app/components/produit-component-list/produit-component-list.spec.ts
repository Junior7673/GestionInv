import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitComponentList } from './produit-component-list';

describe('ProduitComponentList', () => {
  let component: ProduitComponentList;
  let fixture: ComponentFixture<ProduitComponentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitComponentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitComponentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
