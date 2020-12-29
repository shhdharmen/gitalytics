import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { ContributionQueryType, CONTRIBUTION_QUERY_LIST } from '../../../shared/models';

@Component({
  selector: 'gitalytics-twenty-modal',
  templateUrl: './twenty-modal.component.html',
  styleUrls: ['./twenty-modal.component.scss'],
})
export class TwentyModalComponent implements OnInit {
  userName = this.localStorageService.get('userName');
  isDark$ = this.themeService.isDark$;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TwentyModalData,
    private localStorageService: LocalStorageService,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {}

  get twitterIntent() {
    return (
      'https://twitter.com/intent/tweet?url=' +
      encodeURI('https://gitalytics.shhdharmen.me') +
      '&text=' +
      encodeURIComponent(
        `My 2020 GitHub Contributions:\n\n${this.data.totalRepositoryContributions} 📘 repositories,\n${this.data.totalCommitContributions} ✅ commits,\n${this.data.totalIssueContributions} ⚠ issues,\n${this.data.totalPullRequestContributions} ⬆ pull requests\nreviewed 👀 ${this.data.totalPullRequestReviewContributions} pull requests\n\nFind out yours!\n\n`
      ) +
      '&via=gitalytics_app&hashtags=2020Coded'
    );
  }

  download() {
    const shareDiv = document.querySelector('.share-div') as HTMLElement;
    // shareDiv.style.width = '411px';
    html2canvas(shareDiv).then((canvas) => {
      this.saveAs(canvas.toDataURL(), this.userName + '-' + 'repositories-2020.png');
      shareDiv.style.width = 'initial';
    });
  }

  saveAs(uri: string, filename: string) {
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }
}

export interface TwentyModalData {
  totalIssueContributions: number;
  totalCommitContributions: number;
  totalRepositoryContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoriesWithContributedIssues: number;
  totalRepositoriesWithContributedCommits: number;
  totalRepositoriesWithContributedPullRequests: number;
  totalRepositoriesWithContributedPullRequestReviews: number;
}
