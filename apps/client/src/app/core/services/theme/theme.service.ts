import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkSub = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSub.asObservable();

  constructor() {}

  updateIsDark(value: boolean) {
    this.isDarkSub.next(value);
  }
}
