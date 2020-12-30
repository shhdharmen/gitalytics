import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import html2canvas from 'html2canvas';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { buildTwitterIntent, saveAs } from '../../../../shared/helpers';

@Component({
  selector: 'gitalytics-commit-modal',
  templateUrl: './commit-modal.component.html',
  styleUrls: ['./commit-modal.component.scss'],
})
export class CommitModalComponent implements OnInit {
  isDark$ = this.themeService.isDark$;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CommitModalData,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {}

  get twitterIntent() {
    return buildTwitterIntent(
      `I pushed total ${this.data.totalCommitContributions} commits, from them ${this.data.totalRepositoriesWithContributedCommits} were pushed in different repositories in 2020 on GitHub!\n\n Find out yours!\n\n`
    );
  }

  download() {
    const shareDiv = document.querySelector('.share-div') as HTMLElement;
    html2canvas(shareDiv).then((canvas) => {
      saveAs(canvas.toDataURL(), this.data.login + '-' + 'commits-2020.png');
    });
  }
}

export interface CommitModalData {
  login: string;
  totalCommitContributions: number;
  totalRepositoriesWithContributedCommits: number;
}
