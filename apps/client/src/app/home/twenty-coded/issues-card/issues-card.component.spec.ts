import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesCardComponent } from './issues-card.component';

describe('IssuesCardComponent', () => {
  let component: IssuesCardComponent;
  let fixture: ComponentFixture<IssuesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuesCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
