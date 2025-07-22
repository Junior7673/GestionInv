import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortieUpdate } from './sortie-update';

describe('SortieUpdate', () => {
  let component: SortieUpdate;
  let fixture: ComponentFixture<SortieUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortieUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortieUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
