import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { buildCommitCard, buildRepoCard } from './card-builders';
import { ThemeService } from '../../core/services/theme/theme.service';
import { ShareModalComponent } from './share-modal/share-modal.component';
import { TotalContributionsQuery, TotalContributionsGQL } from '../../generated/graphql';
import { DialogComponent, DialogData } from '../../shared/components/dialog/dialog.component';

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
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private totalContributionsGQL: TotalContributionsGQL,
    private dataService: DataService,
    private themeService: ThemeService
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

  share() {
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
    };
    this.dialog.open(TwentyModalComponent, {
      data,
      panelClass: this.panelClass,
    });
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
          console.log('updating user login');
          this.dataService.updateUserLoginSub(true);
          this.data = data;
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

          default:
            break;
        }
        if (card) {
          this.shareCardList.push(card);
        }
      }
    }
    // console.log(this.shareCardList);
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
