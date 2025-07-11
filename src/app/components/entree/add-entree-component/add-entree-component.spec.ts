import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntreeComponent } from './add-entree-component';

describe('AddEntreeComponent', () => {
  let component: AddEntreeComponent;
  let fixture: ComponentFixture<AddEntreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEntreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
