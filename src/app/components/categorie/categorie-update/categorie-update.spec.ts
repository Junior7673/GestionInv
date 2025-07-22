import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieUpdate } from './categorie-update';

describe('CategorieUpdate', () => {
  let component: CategorieUpdate;
  let fixture: ComponentFixture<CategorieUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
