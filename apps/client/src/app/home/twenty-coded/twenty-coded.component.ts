import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeSlideInOut } from '../../core/animations/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { TwentyModalComponent, TwentyModalData } from './twenty-modal/twenty-modal.component';
import {
  CONTRIBUTION_DESCRIPTION,
  CONTRIBUTION_ICON,
  CONTRIBUTION_TITLE,
  twentyFrom,
  twentyTo,
} from '../../shared/constants';
import { DataService } from '../../core/services/data/data.service';
import { ContributionQueryType, ShareModalData, TwentyShareCardType } from '../../shared/models';
import {
  buildCommitCard,
  buildIssueCard,
  buildPullRequestCard,
  buildRepoCard,
  buildReviewCard,
} from './card-builders';
import { ThemeService } from '../../core/services/theme/theme.service';
import { ShareModalComponent } from './share-modal/share-modal.component';
import { TotalContributionsQuery, TotalContributionsGQL } from '../../generated/graphql';
import { DialogComponent, DialogData } from '../../shared/components/dialog/dialog.component';
import { DOCUMENT } from '@angular/common';
import html2canvas from 'html2canvas';
import { buildTwitterIntent, saveAs } from '../../shared/helpers';
import { DomSanitizer } from '@angular/platform-browser';
import domtoimage from 'dom-to-image';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'gitalytics-twenty-coded',
  templateUrl: './twenty-coded.component.html',
  styleUrls: ['./twenty-coded.component.scss'],
  animations: [fadeSlideInOut],
})
export class TwentyCodedComponent implements OnInit, OnDestroy {
  isLoading = true;
  userName: string;
  totalContributions$: Observable<TotalContributionsQuery>;
  data: TotalContributionsQuery;
  activeIndex = 0;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.HandsetPortrait)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isTablet$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.TabletLandscape)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isTabletPortrait$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.TabletPortrait, Breakpoints.HandsetLandscape])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isDark$ = this.themeService.isDark$;

  panelClass = ['custom-dialog'];
  subscriptions: Subscription[] = [];

  shareCardList: TwentyShareCardType[] = [];
  readonly CONTRIBUTION_ICON = CONTRIBUTION_ICON;
  readonly CONTRIBUTION_TITLE = CONTRIBUTION_TITLE;
  readonly CONTRIBUTION_DESCRIPTION = CONTRIBUTION_DESCRIPTION;

  totalStarCount = 0;
  closedIssue = 0;
  closedPR = 0;
  comments = 0;
  mergedPR = 0;
  reactions = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private totalContributionsGQL: TotalContributionsGQL,
    private dataService: DataService,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private sanitized: DomSanitizer,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const userName = this.route.snapshot.paramMap.get('userName');

    this.userName = userName;
    this.getDataForUser();
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

  download() {
    this.isDark$.pipe(take(1)).subscribe((isDark) => {
      const shareDiv = this.document.querySelector('.share-div') as HTMLElement;

      domtoimage
        .toPng(shareDiv, {
          filter: (node: HTMLElement) => {
            return !(node.hasAttribute && node.hasAttribute('data-html2canvas-ignore'));
          },
          bgcolor: isDark ? '#303030' : '#fafafa',
        })
        .then((dataUrl) => {
          saveAs(dataUrl, this.userName + '-2020Coded.png');
        });
    });
  }

  shareTwentyData() {
    const collection = this.data.user.contributionsCollection;
    const data: TwentyModalData = {
      login: this.data.user.login,
      totalIssueContributions: collection.totalIssueContributions,
      totalCommitContributions: collection.totalCommitContributions,
      totalRepositoryContributions: collection.totalRepositoryContributions,
      totalPullRequestContributions: collection.totalPullRequestContributions,
      totalPullRequestReviewContributions: collection.totalPullRequestReviewContributions,
      totalRepositoriesWithContributedIssues: collection.totalRepositoriesWithContributedIssues,
      totalRepositoriesWithContributedCommits: collection.totalRepositoriesWithContributedCommits,
      totalRepositoriesWithContributedPullRequests:
        collection.totalRepositoriesWithContributedPullRequests,
      totalRepositoriesWithContributedPullRequestReviews:
        collection.totalRepositoriesWithContributedPullRequestReviews,
      totalStarCount: this.totalStarCount,
      closedIssue: this.closedIssue,
      closedPR: this.closedPR,
      comments: this.comments,
      mergedPR: this.mergedPR,
      reactions: this.reactions,
    };
    this.dialog.open(TwentyModalComponent, {
      data,
      panelClass: this.panelClass.concat('max-vh-100', 'max-vw-100'),
    });
  }

  get twitterIntent() {
    const collection = this.data.user.contributionsCollection;
    return buildTwitterIntent(
      `My 2020 GitHub Contributions:\n\n📘 ${collection.totalRepositoryContributions} repositories,\n✅ ${collection.totalCommitContributions} commits,\n⭐~${this.totalStarCount} stars,\n⚠ ${collection.totalIssueContributions} issues,\n⬆ ${collection.totalPullRequestContributions} pull requests\n👀 reviewed ${collection.totalPullRequestReviewContributions} PRs\n\nFind out yours!\n\n`
    );
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

  private getDataForUser() {
    this.totalContributions$ = this.totalContributionsGQL
      .watch({ login: this.userName, from: twentyFrom, to: twentyTo })
      .valueChanges.pipe(map((result) => result.data));

    this.subscriptions.push(
      this.totalContributions$.pipe(take(1)).subscribe(
        (data) => {
          const userFragment = data.user;
          this.dataService.userLogin = {
            avatarUrl: userFragment.avatarUrl,
            login: userFragment.login,
            url: userFragment.url,
            bio: userFragment.bio,
            name: userFragment.name,
          };
          this.dataService.updateUserLoginSub(true);
          this.data = data;
          const collection = this.data.user.contributionsCollection;
          collection.repositoryContributions.edges.forEach((item) => {
            this.totalStarCount += item.node.repository.stargazerCount;
          });
          collection.issueContributions.edges.forEach((issue) => {
            this.closedIssue += issue?.node.issue.closed ? 1 : 0;
          });
          collection.pullRequestContributions.edges.forEach((pr) => {
            this.mergedPR += pr?.node?.pullRequest?.merged ? 1 : 0;
            this.closedPR += pr?.node?.pullRequest?.closed ? 1 : 0;
          });
          collection.pullRequestReviewContributions.edges.forEach((re) => {
            this.comments += re?.node?.pullRequestReview?.comments?.totalCount ?? 0;
            this.reactions += re?.node?.pullRequestReview?.reactions?.totalCount ?? 0;
          });
          this.buildShareCards();
        },
        () => {
          this.dataService.userLogin = {
            avatarUrl: '',
            login: '',
            url: '',
            bio: '',
            name: '',
          };
          this.dataService.updateUserLoginSub(false);
          this.isLoading = false;
          this.router.navigate(['']);
        }
      )
    );
  }

  openDialog(data: DialogData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['']);
    });
  }

  buildShareCards() {
    const contributionData = this.data.user.contributionsCollection;
    for (const key in contributionData) {
      if (Object.prototype.hasOwnProperty.call(contributionData, key)) {
        let card: TwentyShareCardType;
        const queryKey = key as ContributionQueryType;

        switch (queryKey) {
          case 'totalRepositoryContributions':
            card = buildRepoCard(this.data);
            break;
          case 'totalCommitContributions':
            card = buildCommitCard(this.data);
            break;
          case 'totalIssueContributions':
            card = buildIssueCard(this.data);
            break;
          case 'totalPullRequestContributions':
            card = buildPullRequestCard(this.data);
            break;
          case 'totalPullRequestReviewContributions':
            card = buildReviewCard(this.data);
            break;
          default:
            break;
        }
        if (card) {
          this.shareCardList.push(card);
        }
      }
    }
    this.isLoading = false;
  }

  shareCard(data: ShareModalData) {
    this.dialog.open(ShareModalComponent, {
      data,
      restoreFocus: false,
      panelClass: this.panelClass,
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe);
  }
}
