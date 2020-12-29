import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'gitalytics-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  themeColor = 'primary';
  isDark = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
  userName = 'shhdharmen';

  constructor(
    private overlayContainer: OverlayContainer,
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.isDark = this.localStorage.get('isDark') === 'true';
    this.updateTheme();
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
}
