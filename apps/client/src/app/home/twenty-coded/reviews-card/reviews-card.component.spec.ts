import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsCardComponent } from './reviews-card.component';

describe('ReviewsCardComponent', () => {
  let component: ReviewsCardComponent;
  let fixture: ComponentFixture<ReviewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
