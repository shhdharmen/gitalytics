import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitModalComponent } from './commit-modal.component';

describe('CommitModalComponent', () => {
  let component: CommitModalComponent;
  let fixture: ComponentFixture<CommitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommitModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
