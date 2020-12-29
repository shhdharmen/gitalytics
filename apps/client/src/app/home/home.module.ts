import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module';
import { TwentyCodedComponent } from './twenty-coded/twenty-coded.component';
import { SharedModule } from '../shared/shared.module';
import { DashabordComponent } from './dashabord/dashabord.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RepoCardComponent } from './twenty-coded/repo-card/repo-card.component';
import { CommitCardComponent } from './twenty-coded/commit-card/commit-card.component';
import { IssuesCardComponent } from './twenty-coded/issues-card/issues-card.component';
import { PullRequestsCardComponent } from './twenty-coded/pull-requests-card/pull-requests-card.component';
import { ReviewsCardComponent } from './twenty-coded/reviews-card/reviews-card.component';
import { RepoModalComponent } from './twenty-coded/repo-card/repo-modal/repo-modal.component';
import { TwentyModalComponent } from './twenty-coded/twenty-modal/twenty-modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    TwentyCodedComponent,
    DashabordComponent,
    RepoCardComponent,
    CommitCardComponent,
    IssuesCardComponent,
    PullRequestsCardComponent,
    ReviewsCardComponent,
    RepoModalComponent,
    TwentyModalComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
})
export class HomeModule {}
