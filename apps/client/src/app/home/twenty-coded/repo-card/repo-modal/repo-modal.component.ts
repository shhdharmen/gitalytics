import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'gitalytics-repo-modal',
  templateUrl: './repo-modal.component.html',
  styleUrls: ['./repo-modal.component.scss'],
})
export class RepoModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RepoModalData) {}

  ngOnInit(): void {}

  get twitterIntent() {
    return (
      'https://twitter.com/intent/tweet?url=' +
      encodeURI('https://gitalytics.shhdharmen.me') +
      '&text=' +
      encodeURIComponent(
        `I created ${this.data.repositoriesCount} 📘 repositories, they got ${this.data.starCount} ⭐s and were forked ${this.data.forkCount} times. Find out yours!`
      ) +
      '&hashtags=2020Coded'
    );
  }
}

export interface RepoModalData {
  repositoriesCount: string;
  starCount: string;
  forkCount: string;
}
