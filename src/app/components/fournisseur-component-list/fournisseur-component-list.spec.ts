import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurComponentList } from './fournisseur-component-list';

describe('FournisseurComponentList', () => {
  let component: FournisseurComponentList;
  let fixture: ComponentFixture<FournisseurComponentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FournisseurComponentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseurComponentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
