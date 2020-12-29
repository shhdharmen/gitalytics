import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyModalComponent } from './twenty-modal.component';

describe('TwentyModalComponent', () => {
  let component: TwentyModalComponent;
  let fixture: ComponentFixture<TwentyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwentyModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
