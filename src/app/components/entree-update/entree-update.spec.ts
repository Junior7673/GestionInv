import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreeUpdate } from './entree-update';

describe('EntreeUpdate', () => {
  let component: EntreeUpdate;
  let fixture: ComponentFixture<EntreeUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntreeUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntreeUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
