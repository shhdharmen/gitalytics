import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../../core/services/data/data.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';
import { TotalContributionsGQL, TotalContributionsQuery } from '../../../generated/graphql';
import { ActivatedRoute, Router } from '@angular/router';
import { twentyFrom, twentyTo } from '../../shared/constants';
import { fadeSlideInOut } from '../../core/animations/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  isHandSet: boolean;
  constructor(
    private dataService: DataService,
    private localStorage: LocalStorageService,
    private router: Router,
    private totalContributionsGQL: TotalContributionsGQL,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
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
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        this.isHandSet = matches;
      })
    );
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
}
