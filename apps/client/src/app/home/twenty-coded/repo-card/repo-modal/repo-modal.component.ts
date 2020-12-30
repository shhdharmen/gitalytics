import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import html2canvas from 'html2canvas';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { buildTwitterIntent, saveAs } from '../../../../shared/helpers';

@Component({
  selector: 'gitalytics-repo-modal',
  templateUrl: './repo-modal.component.html',
  styleUrls: ['./repo-modal.component.scss'],
})
export class RepoModalComponent implements OnInit {
  isDark$ = this.themeService.isDark$;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RepoModalData,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {}

  get twitterIntent() {
    return buildTwitterIntent(
      `I created ${this.data.repositoriesCount} 📘 repositories, they got ${this.data.starCount} ⭐s and were forked ${this.data.forkCount} times!\n\n Find out yours!\n\n`
    );
  }

  download() {
    const shareDiv = this.document.querySelector('.share-div') as HTMLElement;
    html2canvas(shareDiv).then((canvas) => {
      saveAs(canvas.toDataURL(), this.data.login + '-' + 'repositories-2020.png');
    });
  }
}

export interface RepoModalData {
  login: string;
  repositoriesCount: string;
  starCount: string;
  forkCount: string;
}
