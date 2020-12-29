import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import html2canvas from 'html2canvas';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'gitalytics-commit-modal',
  templateUrl: './commit-modal.component.html',
  styleUrls: ['./commit-modal.component.scss'],
})
export class CommitModalComponent implements OnInit {
  userName = this.localStorageService.get('userName');
  isDark$ = this.themeService.isDark$;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CommitModalData,
    private localStorageService: LocalStorageService,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {}

  get twitterIntent() {
    return (
      'https://twitter.com/intent/tweet?url=' +
      encodeURI('https://gitalytics.shhdharmen.me') +
      '&text=' +
      encodeURIComponent(
        `I pushed total ${this.data.totalCommitContributions} commits, from them ${this.data.totalRepositoriesWithContributedCommits} were pushed in different repositories in 2020 on GitHub!\n\n Find out yours!\n\n`
      ) +
      '&via=gitalytics_app&hashtags=2020Coded'
    );
  }

  download() {
    const shareDiv = document.querySelector('.share-div') as HTMLElement;
    html2canvas(shareDiv).then((canvas) => {
      this.saveAs(canvas.toDataURL(), this.userName + '-' + 'commits-2020.png');
    });
  }

  saveAs(uri: string, filename: string) {
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }
}

export interface CommitModalData {
  totalCommitContributions: number;
  totalRepositoriesWithContributedCommits: number;
}
