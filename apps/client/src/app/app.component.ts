import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@gitalytics/api-interfaces';
import { environment } from '../environments/environment';

@Component({
  selector: 'gitalytics-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hello$ = this.http.get<Message>(environment.api_url + '/hello');
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.hello$.subscribe(() => {
      // console.log('API is working!');
    });
  }
}
