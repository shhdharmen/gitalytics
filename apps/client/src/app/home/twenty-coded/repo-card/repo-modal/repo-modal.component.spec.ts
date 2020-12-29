import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoModalComponent } from './repo-modal.component';

describe('RepoModalComponent', () => {
  let component: RepoModalComponent;
  let fixture: ComponentFixture<RepoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
