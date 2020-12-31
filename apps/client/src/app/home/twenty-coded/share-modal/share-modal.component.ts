import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { saveAs } from '../../../shared/helpers';
import { ShareModalData } from '../../../shared/models';

@Component({
  selector: 'gitalytics-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
})
export class ShareModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShareModalData,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {}

  download() {
    const shareDiv = this.document.querySelector('.share-div') as HTMLElement;
    html2canvas(shareDiv).then((canvas) => {
      saveAs(canvas.toDataURL(), 'repositories-2020.png');
    });
  }
}
