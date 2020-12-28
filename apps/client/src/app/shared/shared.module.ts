import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { WidgetLoaderComponent } from './components/widget-loader/widget-loader.component';

@NgModule({
  declarations: [DialogComponent, WidgetLoaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [WidgetLoaderComponent],
})
export class SharedModule {}
