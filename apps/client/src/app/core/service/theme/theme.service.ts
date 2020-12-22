import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkSub = new Subject<boolean>();
  isDark$ = this.isDarkSub.asObservable();

  constructor() {}

  updateIsDark(value: boolean) {
    this.isDarkSub.next(value);
  }
}
