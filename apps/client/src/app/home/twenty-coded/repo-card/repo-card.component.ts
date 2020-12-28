import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
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
export class RepoCardComponent implements OnInit {
  // card meta data
  readonly queryType: ContributionQueryType = 'totalRepositoryContributions';
  readonly icon: IconName = CONTRIBUTION_ICON[this.queryType];
  readonly title = CONTRIBUTION_TITLE[this.queryType];
  readonly description = CONTRIBUTION_DESCRIPTION[this.queryType];

  @Input() totalRepositoryContributions: number;
  @Input() edges: {
    node?: { repository: { isFork: boolean; stargazerCount: number; forkCount: number } };
  }[];

  starCount = 0;
  forkCount = 0;
  forkedFromCount = 0;

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.edges.forEach((item) => {
      this.forkCount += item.node.repository.forkCount;
      this.forkedFromCount += item.node.repository.isFork ? 1 : 0;
      this.starCount += item.node.repository.stargazerCount;
    });
  }

  share() {
    const data: RepoModalData = {
      forkCount: this.forkCount.toString(),
      repositoriesCount: this.totalRepositoryContributions.toString(),
      starCount: this.starCount.toString(),
    };
    const dialogRef = this.dialog.open(RepoModalComponent, {
      data,
      restoreFocus: false,
      panelClass: 'custom-dialog',
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}
