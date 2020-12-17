import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@gitalytics/api-interfaces';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './core/service/notification/notification.service';
import { DialogComponent } from './shared/components/dialog/dialog.component';

@Component({
  selector: 'gitalytics-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {}

  openDialog(themeColor: 'primary' | 'accent' | 'warn'): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data: {
        themeColor,
      },
    });
  }

  openNotification(): void {
    this.notification.default('Default Notification');
  }
}
