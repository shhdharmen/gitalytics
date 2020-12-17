import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [SideNavComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SideNavComponent],
})
export class CoreModule {}
