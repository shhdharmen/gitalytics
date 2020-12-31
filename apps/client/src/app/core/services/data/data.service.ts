import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDataFragment } from '../../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userLoginSub = new BehaviorSubject<boolean>(false);
  userLogin$ = this.userLoginSub.asObservable();
  userLogin: UserDataFragment = { avatarUrl: '', url: '', login: '', name: '', bio: '' };

  constructor() {}

  updateUserLoginSub(data: boolean) {
    this.userLoginSub.next(data);
  }
}
