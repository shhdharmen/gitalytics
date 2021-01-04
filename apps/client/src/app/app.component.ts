import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@gitalytics/api-interfaces';
import { ThemeService as ChartThemeService } from 'ng2-charts';
import { environment } from '../environments/environment';
import { routeAnimations } from './core/animations/animations';
import { AnimationsService } from './core/animations/animations.service';
import { ThemeService } from './core/services/theme/theme.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'gitalytics-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  hello$ = this.http.get<Message>(environment.api_url + '/hello');
  isDark$ = this.themeService.isDark$;
  chartOptionsOverrides: ChartOptions;
  constructor(
    private http: HttpClient,
    private animationService: AnimationsService,
    private themeService: ThemeService,
    private chartThemeService: ChartThemeService
  ) {}

  ngOnInit() {
    this.animationService.updateRouteAnimationType(true, true);

    this.hello$.subscribe(() => {
      // console.log('API is working!');
    });

    this.isDark$.subscribe((isDark) => {
      if (isDark) {
        this.chartOptionsOverrides = {
          legend: {
            labels: { fontColor: 'white' },
          },
          scales: {
            xAxes: [
              {
                ticks: { fontColor: 'white' },
                gridLines: { color: 'rgba(255,255,255,0.1)' },
              },
            ],
            yAxes: [
              {
                ticks: { fontColor: 'white' },
                gridLines: { color: 'rgba(255,255,255,0.1)' },
              },
            ],
          },
        };
      } else {
        this.chartOptionsOverrides = {
          legend: {
            labels: { fontColor: 'rgba(0, 0, 0, 0.87)' },
          },
          scales: {
            xAxes: [
              {
                ticks: { fontColor: 'rgba(0, 0, 0, 0.87)' },
                gridLines: { color: 'rgba(0,0,0,0.1)' },
              },
            ],
            yAxes: [
              {
                ticks: { fontColor: 'white' },
                gridLines: { color: 'rgba(255,255,255,0.1)' },
              },
            ],
          },
        };
      }
      this.chartThemeService.setColorschemesOptions(this.chartOptionsOverrides);
    });
  }
}
