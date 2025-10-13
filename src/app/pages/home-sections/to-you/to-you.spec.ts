import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToYou } from './to-you';

describe('ToYou', () => {
  let component: ToYou;
  let fixture: ComponentFixture<ToYou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToYou]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToYou);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
