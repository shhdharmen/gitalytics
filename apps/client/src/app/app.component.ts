import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@gitalytics/api-interfaces';
import { environment } from '../environments/environment';
import { routeAnimations } from './core/animations/animations';
import { AnimationsService } from './core/animations/animations.service';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'gitalytics-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  hello$ = this.http.get<Message>(environment.api_url + '/hello');
  isDark$ = this.themeService.isDark$;
  constructor(
    private http: HttpClient,
    private animationService: AnimationsService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.animationService.updateRouteAnimationType(true, true);

    this.hello$.subscribe(() => {
      // console.log('API is working!');
    });
  }
}
