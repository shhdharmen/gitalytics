import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { fadeSlideInOut } from '../core/animations/animations';
import { DataService } from '../core/services/data/data.service';
import { LocalStorageService } from '../core/services/local-storage/local-storage.service';
import { ThemeService } from '../core/services/theme/theme.service';
import { UserLoginGQL, UserLoginQuery } from '../generated/graphql';
import { DialogComponent, DialogData } from '../shared/components/dialog/dialog.component';
import { twentyFrom, twentyTo } from '../shared/constants';

@Component({
  selector: 'gitalytics-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeSlideInOut],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = true;
  isUsernameLoading = false;
  loginForm = this.fb.group({
    userName: [null, Validators.required],
  });
  isDark$ = this.themeService.isDark$;
  totalContributions$: Observable<UserLoginQuery>;
  subscriptions: Subscription[] = [];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private totalContributionsGQL: UserLoginGQL,
    private dialog: MatDialog,
    private dataService: DataService,
    private router: Router,
    private localStorage: LocalStorageService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.isUsernameLoading = true;
    const userName = this.loginForm.get('userName').value;
    if (userName) {
      this.getDataForUser(userName);
    }
  }

  private getDataForUser(userName: string, showError = true) {
    // this.router.navigate(['/user', userName, '2020Coded']);

    this.totalContributions$ = this.totalContributionsGQL
      .watch({ login: userName })
      .valueChanges.pipe(map((result) => result.data));

    this.subscriptions.push(
      this.totalContributions$.subscribe(
        (data) => {
          this.dataService.userLogin = {
            avatarUrl: data.user.avatarUrl,
            login: data.user.login,
            url: data.user.url,
            bio: data.user.bio,
            name: data.user.name,
          };
          this.dataService.updateUserLoginSub(true);
          this.isUsernameLoading = false;
          this.isLoading = false;
          this.router.navigate(['/user', userName, '2020Coded']);
        },
        () => {
          this.isUsernameLoading = false;
          this.isLoading = false;
          this.dataService.userLogin = {
            avatarUrl: '',
            login: '',
            url: '',
            bio: '',
            name: '',
          };
          this.dataService.updateUserLoginSub(false);
          if (showError) {
            const dialogData: DialogData = {
              themeColor: 'warn',
              content: 'Error while getting data for: <b><i>' + userName + '</i></b>',
              header: 'Error!',
              subHeader: 'Gitalytics did not get your profile!',
            };
            this.openDialog(dialogData);
          }
        }
      )
    );
  }

  openDialog(data: DialogData): void {
    this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data,
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
