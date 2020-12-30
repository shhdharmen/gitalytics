import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import {
  CONTRIBUTION_DESCRIPTION,
  CONTRIBUTION_ICON,
  CONTRIBUTION_TITLE,
} from '../../../shared/constants';
import { ContributionQueryType, IconName } from '../../../shared/models';
import { RepoModalComponent, RepoModalData } from './repo-modal/repo-modal.component';

@Component({
  selector: 'gitalytics-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss'],
})
export class RepoCardComponent implements OnInit, OnDestroy {
  // card meta data
  readonly queryType: ContributionQueryType = 'totalRepositoryContributions';
  readonly icon: IconName = CONTRIBUTION_ICON[this.queryType];
  readonly title = CONTRIBUTION_TITLE[this.queryType];
  readonly description = CONTRIBUTION_DESCRIPTION[this.queryType];

  @Input() login: string;
  @Input() totalRepositoryContributions: number;
  @Input() edges: {
    node?: { repository: { isFork: boolean; stargazerCount: number; forkCount: number } };
  }[];

  starCount = 0;
  forkCount = 0;
  forkedFromCount = 0;

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  panelClass = ['custom-dialog'];
  subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.edges.forEach((item) => {
      this.forkCount += item.node.repository.forkCount;
      this.forkedFromCount += item.node.repository.isFork ? 1 : 0;
      this.starCount += item.node.repository.stargazerCount;
    });
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
    const data: RepoModalData = {
      login: this.login,
      forkCount: this.forkCount.toString(),
      repositoriesCount: this.totalRepositoryContributions.toString(),
      starCount: this.starCount.toString(),
    };
    const dialogRef = this.dialog.open(RepoModalComponent, {
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
