import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DataService } from '../../core/services/data/data.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';
import { TotalContributionsGQL, TotalContributionsQuery } from '../../../generated/graphql';
import { ActivatedRoute, Router } from '@angular/router';
import { twentyFrom, twentyTo } from '../../shared/constants';
import { fadeSlideInOut } from '../../core/animations/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { TwentyModalComponent, TwentyModalData } from './twenty-modal/twenty-modal.component';

@Component({
  selector: 'gitalytics-twenty-coded',
  templateUrl: './twenty-coded.component.html',
  styleUrls: ['./twenty-coded.component.scss'],
  animations: [fadeSlideInOut],
})
export class TwentyCodedComponent implements OnInit {
  isLoading = true;
  userName: string;
  data: TotalContributionsQuery;
  totalContributions$: Observable<TotalContributionsQuery>;
  activeIndex = 0;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  panelClass = ['custom-dialog'];
  constructor(
    private dataService: DataService,
    private localStorage: LocalStorageService,
    private router: Router,
    private totalContributionsGQL: TotalContributionsGQL,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const userName =
      this.route.snapshot.paramMap.get('userName') || this.localStorage.get('userName');

    if (userName) {
      this.userName = userName;
      this.dataService.twentyData$.subscribe((data) => {
        if (Object.prototype.hasOwnProperty.call(data, 'user')) {
          this.data = data;
          this.isLoading = false;
        } else {
          this.getDataForUser();
        }
      });
    } else {
      this.router.navigate(['']);
    }
    this.isHandset$.subscribe((isHandSet) => {
      if (isHandSet) {
        this.panelClass.push('min-vw-100');
        this.panelClass.push('min-vh-100');
      } else {
        this.panelClass = ['custom-dialog'];
      }
    });
  }

  private getDataForUser() {
    this.totalContributions$ = this.totalContributionsGQL
      .watch({ login: this.userName, from: twentyFrom, to: twentyTo })
      .valueChanges.pipe(map((result) => result.data));

    this.totalContributions$.subscribe(
      (data) => {
        this.isLoading = false;
        this.localStorage.set('userName', this.userName);
        this.dataService.updateTwentyDataSub(data);
      },
      () => {
        this.isLoading = false;
        this.router.navigate(['']);
      }
    );
  }

  share() {
    const collection = this.data.user.contributionsCollection;
    const data: TwentyModalData = {
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
}
