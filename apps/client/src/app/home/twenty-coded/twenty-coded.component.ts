import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { first, map, shareReplay, take, takeLast, takeUntil } from 'rxjs/operators';
import { DataService } from '../../core/services/data/data.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';
import { TotalContributionsGQL, TotalContributionsQuery } from '../../../generated/graphql';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeSlideInOut } from '../../core/animations/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { TwentyModalComponent, TwentyModalData } from './twenty-modal/twenty-modal.component';
import { twentyFrom, twentyTo } from '../../shared/constants';

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
    private dataService: DataService,
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private totalContributionsGQL: TotalContributionsGQL
  ) {}

  ngOnInit() {
    const userName = this.route.snapshot.paramMap.get('userName');

    if (userName) {
      this.userName = userName;
      const data = this.dataService.twentyData;
      console.log('got data', data);
      if (Object.prototype.hasOwnProperty.call(data, 'user')) {
        this.data = data;
        this.isLoading = false;
      } else {
        this.getDataForUser();
      }
    } else {
      this.router.navigate(['']);
    }
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
          this.isLoading = false;
          this.data = data;
          this.localStorage.set('userName', this.userName);
          this.dataService.twentyData = Object.assign({}, data);
          this.dataService.updateTwentyDataSub(true);
        },
        () => {
          this.isLoading = false;
          this.dataService.updateTwentyDataSub(false);
          this.router.navigate(['']);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe);
    this.dataService.twentyData = {};
    this.dataService.updateTwentyDataSub(false);
  }
}
