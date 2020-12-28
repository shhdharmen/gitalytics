import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TotalContributionsQuery, TotalContributionsGQL } from '../../generated/graphql';
import { fadeSlideInOut } from '../core/animations/animations';
import { DataService } from '../core/services/data/data.service';
import { LocalStorageService } from '../core/services/local-storage/local-storage.service';
import { ThemeService } from '../core/services/theme/theme.service';
import { DialogComponent, DialogData } from '../shared/components/dialog/dialog.component';
import { twentyFrom, twentyTo } from '../shared/constants';

@Component({
  selector: 'gitalytics-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeSlideInOut],
})
export class HomeComponent implements OnInit {
  isLoading = true;
  isUsernameLoading = false;
  loginForm = this.fb.group({
    userName: [null, Validators.required],
  });
  isDark$ = this.themeService.isDark$;
  totalContributions$: Observable<TotalContributionsQuery>;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private totalContributionsGQL: TotalContributionsGQL,
    private dialog: MatDialog,
    private dataService: DataService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    const userName = this.localStorage.get('userName');

    if (userName) {
      this.loginForm.get('userName').setValue(userName);
      this.getDataForUser(userName, false);
    } else {
      this.isLoading = false;
    }
  }

  onSubmit() {
    this.isUsernameLoading = true;
    const userName = this.loginForm.get('userName').value;
    if (userName) {
      this.getDataForUser(userName);
    }
  }

  private getDataForUser(userName: string, showError = true) {
    this.totalContributions$ = this.totalContributionsGQL
      .watch({ login: userName, from: twentyFrom, to: twentyTo })
      .valueChanges.pipe(map((result) => result.data));

    this.totalContributions$.subscribe(
      (data) => {
        this.isUsernameLoading = false;
        this.isLoading = false;
        this.localStorage.set('userName', userName);
        this.dataService.updateTwentyDataSub(data);
        this.router.navigate(['/user', userName, '2020Coded']);
      },
      () => {
        this.isUsernameLoading = false;
        this.isLoading = false;
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
    );
  }

  openDialog(data: DialogData): void {
    this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data,
    });
  }
}
