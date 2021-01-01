import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { buildTwitterIntent, saveAs } from '../../../shared/helpers';

@Component({
  selector: 'gitalytics-twenty-modal',
  templateUrl: './twenty-modal.component.html',
  styleUrls: ['./twenty-modal.component.scss'],
})
export class TwentyModalComponent implements OnInit {
  isDark$ = this.themeService.isDark$;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TwentyModalData,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get twitterIntent() {
    return buildTwitterIntent(
      `My 2020 GitHub Contributions:\n\n
      ${this.data.totalRepositoryContributions} 📘 repositories,\n
      ${this.data.totalCommitContributions} ✅ commits,\n
      ${this.data.totalIssueContributions} ⚠ issues,\n
      ${this.data.totalPullRequestContributions} ⬆ pull requests\n
      reviewed 👀 ${this.data.totalPullRequestReviewContributions} pull requests\n\n
      Find out yours!\n\n`
    );
  }

  download() {
    const shareDiv = document.querySelector('.share-div') as HTMLElement;
    html2canvas(shareDiv).then((canvas) => {
      saveAs(canvas.toDataURL(), this.data.login + '-' + 'contributions-2020.png');
    });
  }

  get currentURL() {
    return window.location.href;
  }

  openSnackBar(show: boolean) {
    if (show) {
      this.snackBar.open('URL Copied', 'Close', {
        duration: 2000,
      });
    }
  }
}

export interface TwentyModalData {
  login: string;
  totalIssueContributions: number;
  totalCommitContributions: number;
  totalRepositoryContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoriesWithContributedIssues: number;
  totalRepositoriesWithContributedCommits: number;
  totalRepositoriesWithContributedPullRequests: number;
  totalRepositoriesWithContributedPullRequestReviews: number;
  totalStarCount: number;
  mergedPR: number;
  closedPR: number;
  closedIssue: number;
  comments: number;
  reactions: number;
}
