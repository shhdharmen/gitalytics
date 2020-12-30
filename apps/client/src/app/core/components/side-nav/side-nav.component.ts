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
      this.dataService.userLogin$.subscribe((data) => {
        if (data.login) {
          this.user = {
            avatarUrl: data.avatarUrl,
            url: data.url,
            bio: data.bio,
            name: data.name,
            login: data.login,
          };
        } else {
          this.user = undefined;
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
    this.dataService.updateUserLoginSub({ avatarUrl: '', url: '', login: '' });
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
