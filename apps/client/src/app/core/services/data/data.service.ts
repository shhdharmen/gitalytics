import { Injectable } from '@angular/core';
import { UserDataFragment } from '../../../../generated/graphql';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userLoginSub = new BehaviorSubject<UserDataFragment>({
    avatarUrl: '',
    url: '',
    login: '',
  });
  userLogin$ = this.userLoginSub.asObservable();

  constructor() {}

  updateUserLoginSub(data: UserDataFragment) {
    this.userLoginSub.next(data);
  }
}
