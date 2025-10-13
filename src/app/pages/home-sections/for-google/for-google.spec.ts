import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForGoogle } from './for-google';

describe('ForGoogle', () => {
  let component: ForGoogle;
  let fixture: ComponentFixture<ForGoogle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForGoogle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForGoogle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
