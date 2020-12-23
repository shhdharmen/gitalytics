import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeColor } from '../../models';

@Component({
  selector: 'gitalytics-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}
}
export interface DialogData {
  themeColor?: ThemeColor;
  header: string;
  subHeader?: string;
  content: string;
}
