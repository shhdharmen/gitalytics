import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullRequestsCardComponent } from './pull-requests-card.component';

describe('PullRequestsCardComponent', () => {
  let component: PullRequestsCardComponent;
  let fixture: ComponentFixture<PullRequestsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PullRequestsCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PullRequestsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
