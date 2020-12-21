import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ThemeService } from '../core/service/theme/theme.service';

@Component({
  selector: 'gitalytics-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginForm = this.fb.group({
    userName: [null, Validators.required],
    localStorage: [false],
  });
  isDark$ = this.themeService.isDark$;

  constructor(private fb: FormBuilder, private themeService: ThemeService) {}

  onSubmit() {
    alert('Thanks!');
  }
}
