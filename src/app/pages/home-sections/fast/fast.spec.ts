import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fast } from './fast';

describe('Fast', () => {
  let component: Fast;
  let fixture: ComponentFixture<Fast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
