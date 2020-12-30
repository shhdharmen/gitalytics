import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql/graphql.module';
import { MatIconRegistry } from '@angular/material/icon';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [AppComponent, AboutComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    GraphQLModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const iconList = [
      { name: 'commit', url: 'assets/icons/commit.svg' },
      { name: 'code-review', url: 'assets/icons/code-review.svg' },
      { name: 'issue-opened', url: 'assets/icons/issue-opened.svg' },
      { name: 'pull-request', url: 'assets/icons/pull-request.svg' },
      { name: 'repo', url: 'assets/icons/repo.svg' },
      { name: 'github', url: 'assets/icons/github.svg' },
      { name: 'twitter', url: 'assets/icons/twitter.svg' },
      { name: 'star', url: 'assets/icons/star.svg' },
      { name: 'git-fork', url: 'assets/icons/git-fork.svg' },
      { name: 'star-fill', url: 'assets/icons/star-fill.svg' },
      { name: 'verified', url: 'assets/icons/verified.svg' },
      { name: 'unfold', url: 'assets/icons/unfold.svg' },
    ];

    iconList.forEach((icon) => {
      iconRegistry.addSvgIcon(icon.name, sanitizer.bypassSecurityTrustResourceUrl(icon.url));
    });
  }
}
