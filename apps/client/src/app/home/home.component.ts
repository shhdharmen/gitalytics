import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewerGQL, ViewerQuery } from '../../generated/graphql';
import { ThemeService } from '../core/service/theme/theme.service';

@Component({
  selector: 'gitalytics-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loginForm = this.fb.group({
    userName: [null, Validators.required],
    localStorage: [false],
  });
  isDark$ = this.themeService.isDark$;
  viewer$: Observable<ViewerQuery['viewer']>;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private viewerGQL: ViewerGQL
  ) {}

  onSubmit() {
    alert('Thanks!');
  }

  ngOnInit() {
    this.viewer$ = this.viewerGQL.watch().valueChanges.pipe(map((result) => result.data.viewer));
  }
}
