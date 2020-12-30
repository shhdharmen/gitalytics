import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TotalContributionsGQL, TotalContributionsQuery } from '../../../generated/graphql';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeSlideInOut } from '../../core/animations/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { TwentyModalComponent, TwentyModalData } from './twenty-modal/twenty-modal.component';
import { twentyFrom, twentyTo } from '../../shared/constants';
import { DataService } from '../../core/services/data/data.service';

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

  panelClass = ['custom-dialog'];
  subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private totalContributionsGQL: TotalContributionsGQL,
    private dataService: DataService
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
      this.totalContributions$.subscribe(
        (data) => {
          const userFragment = data.user;
          this.dataService.updateUserLoginSub({
            avatarUrl: userFragment.avatarUrl,
            login: userFragment.login,
            url: userFragment.url,
            bio: userFragment.bio,
            name: userFragment.name,
          });
          this.isLoading = false;
          this.data = data;
        },
        () => {
          this.isLoading = false;
          this.router.navigate(['']);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe);
  }
}
