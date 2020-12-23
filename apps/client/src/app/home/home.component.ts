import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserGQL, UserQuery } from '../../generated/graphql';
import { ThemeService } from '../core/service/theme/theme.service';
import { DialogComponent, DialogData } from '../shared/components/dialog/dialog.component';
import { ThemeColor } from '../shared/models';

@Component({
  selector: 'gitalytics-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoading = false;
  loginForm = this.fb.group({
    userName: [null, Validators.required],
    localStorage: [false],
  });
  isDark$ = this.themeService.isDark$;
  user$: Observable<UserQuery['user']>;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private userGQL: UserGQL,
    private dialog: MatDialog
  ) {}

  onSubmit() {
    this.isLoading = true;
    const userName = this.loginForm.get('userName').value;
    this.user$ = this.userGQL
      .watch({ login: userName })
      .valueChanges.pipe(map((result) => result.data.user));

    this.user$.subscribe(
      (data) => {
        this.isLoading = false;
        const dialogData: DialogData = {
          themeColor: 'primary',
          content:
            '<pre class="bg-light border p-2"><code>' +
            JSON.stringify(data, null, 2) +
            '</code></pre>',
          header: 'Success!',
          subHeader: 'Gitalytics got your profile!',
        };
        this.openDialog('primary', dialogData);
      },
      () => {
        this.isLoading = false;
        const dialogData: DialogData = {
          themeColor: 'warn',
          content: 'Error while getting data for: <b><i>' + userName + '</i></b>',
          header: 'Error!',
          subHeader: 'Gitalytics did not get your profile!',
        };
        this.openDialog('warn', dialogData);
      }
    );
  }

  openDialog(themeColor: ThemeColor, data: DialogData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data,
    });
  }
}
