import { Injectable } from '@angular/core';
import { TotalContributionsQuery } from '../../../../generated/graphql';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private twentyDataSub = new BehaviorSubject<boolean>(false);
  twentyData$ = this.twentyDataSub.asObservable();
  twentyData: TotalContributionsQuery = {};

  private nineteenDataSub = new BehaviorSubject<boolean>(false);
  nineteenData$ = this.nineteenDataSub.asObservable();
  nineteenData: TotalContributionsQuery = {};

  private dataSub = new BehaviorSubject<boolean>(false);
  data$ = this.dataSub.asObservable();
  data: TotalContributionsQuery = {};

  constructor() {}

  updateTwentyDataSub(data: boolean) {
    this.twentyDataSub.next(data);
  }

  updateNineteenDataSub(data: boolean) {
    this.nineteenDataSub.next(data);
  }

  updateDataSub(data: boolean) {
    this.dataSub.next(data);
  }
}
