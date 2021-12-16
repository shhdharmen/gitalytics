import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { TwentyCodedComponent } from './twenty-coded/twenty-coded.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'home', redirectTo: '' },
  {
    path: 'user/:userName/:year',
    component: TwentyCodedComponent,
    data: { animation: '2020Page' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
