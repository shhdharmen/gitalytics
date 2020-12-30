import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataFragment } from '../../../../generated/graphql';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { fadeSlideInOutX } from '../../animations/animations';
import { DataService } from '../../services/data/data.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'gitalytics-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [fadeSlideInOutX],
})
export class SideNavComponent implements OnInit, OnDestroy {
  themeColor = 'primary';
  isDark = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
  user: UserDataFragment;
  subscriptions: Subscription[] = [];

  constructor(
    private overlayContainer: OverlayContainer,
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDark = this.localStorage.get('isDark') === 'true';
    this.updateTheme();
    this.subscriptions.push(
      this.dataService.twentyData$.subscribe((hasData) => {
        if (hasData) {
          const data = this.dataService.twentyData;
          if (Object.prototype.hasOwnProperty.call(data, 'user')) {
            this.user = {
              avatarUrl: data.user.avatarUrl,
              url: data.user.url,
              bio: data.user.bio,
              name: data.user.name,
              login: data.user.login,
            };
          }
        }
      })
    );
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.localStorage.set('isDark', this.isDark);
    this.updateTheme();
  }

  private updateTheme() {
    this.themeService.updateIsDark(this.isDark);
    if (this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
    }
  }

  change() {
    this.localStorage.set('userName', '');
    this.dataService.updateTwentyDataSub(false);
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
