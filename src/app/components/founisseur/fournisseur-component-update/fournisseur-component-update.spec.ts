import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurComponentUpdate } from './fournisseur-component-update';

describe('FournisseurComponentUpdate', () => {
  let component: FournisseurComponentUpdate;
  let fixture: ComponentFixture<FournisseurComponentUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FournisseurComponentUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseurComponentUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
