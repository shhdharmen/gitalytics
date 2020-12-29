import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import html2canvas from 'html2canvas';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';

@Component({
  selector: 'gitalytics-repo-modal',
  templateUrl: './repo-modal.component.html',
  styleUrls: ['./repo-modal.component.scss'],
})
export class RepoModalComponent implements OnInit {
  userName = this.localStorageService.get('userName');
  isDark$ = this.themeService.isDark$;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RepoModalData,
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
        `I created ${this.data.repositoriesCount} 📘 repositories, they got ${this.data.starCount} ⭐s and were forked ${this.data.forkCount} times. Find out yours!`
      ) +
      '&via=gitalytics_app&hashtags=2020Coded'
    );
  }

  download() {
    const shareDiv = document.querySelector('.share-div') as HTMLElement;
    shareDiv.style.width = '411px';
    html2canvas(shareDiv).then((canvas) => {
      this.saveAs(canvas.toDataURL(), this.userName + '-' + 'repositories-2020.png');
      shareDiv.style.width = 'initial';
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

export interface RepoModalData {
  repositoriesCount: string;
  starCount: string;
  forkCount: string;
}
