import { Injectable } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkSub = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSub.asObservable();
  chartColorOverrides: Color[] = [
    {
      borderColor: '#F06292',
      backgroundColor: '#F8BBD0',
    },
  ];

  constructor() {}

  updateIsDark(value: boolean) {
    if (value) {
      this.chartColorOverrides = [
        {
          borderColor: '#C8E6C9',
          backgroundColor: '#4CAF50',
        },
      ];
    } else {
      this.chartColorOverrides = [
        {
          borderColor: '#F06292',
          backgroundColor: '#F8BBD0',
        },
      ];
    }
    this.isDarkSub.next(value);
  }
}
