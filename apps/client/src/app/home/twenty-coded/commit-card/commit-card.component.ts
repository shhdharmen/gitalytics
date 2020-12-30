import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import {
  CONTRIBUTION_ICON,
  CONTRIBUTION_TITLE,
  CONTRIBUTION_DESCRIPTION,
} from '../../../shared/constants';
import { ContributionQueryType, IconName } from '../../../shared/models';
import { CommitModalComponent, CommitModalData } from './commit-modal/commit-modal.component';

@Component({
  selector: 'gitalytics-commit-card',
  templateUrl: './commit-card.component.html',
  styleUrls: ['./commit-card.component.scss'],
})
export class CommitCardComponent implements OnInit, OnDestroy {
  // card meta data
  readonly queryType: ContributionQueryType = 'totalCommitContributions';
  readonly icon: IconName = CONTRIBUTION_ICON[this.queryType];
  readonly title = CONTRIBUTION_TITLE[this.queryType];
  readonly description = CONTRIBUTION_DESCRIPTION[this.queryType];

  @Input() login: string;
  @Input() totalCommitContributions: number;
  @Input() totalRepositoriesWithContributedCommits: number;

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  panelClass = ['custom-dialog'];
  subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.isHandset$.subscribe((isHandSet) => {
        if (isHandSet) {
          this.panelClass.push('min-vw-100');
          this.panelClass.push('min-vh-100');
        } else {
          this.panelClass = ['custom-dialog'];
        }
      })
    );
  }

  share() {
    const data: CommitModalData = {
      login: this.login,
      totalCommitContributions: this.totalCommitContributions,
      totalRepositoriesWithContributedCommits: this.totalRepositoriesWithContributedCommits,
    };
    const dialogRef = this.dialog.open(CommitModalComponent, {
      data,
      restoreFocus: false,
      panelClass: this.panelClass,
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe);
  }
}
