import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitCardComponent } from './commit-card.component';

describe('CommitCardComponent', () => {
  let component: CommitCardComponent;
  let fixture: ComponentFixture<CommitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommitCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
