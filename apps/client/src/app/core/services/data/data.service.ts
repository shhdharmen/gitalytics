import { Injectable } from '@angular/core';
import { TotalContributionsQuery } from '../../../../generated/graphql';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private twentyDataSub = new BehaviorSubject<TotalContributionsQuery>({});
  twentyData$ = this.twentyDataSub.asObservable();

  private nineteenDataSub = new BehaviorSubject<TotalContributionsQuery>({});
  nineteenData$ = this.nineteenDataSub.asObservable();

  private dataSub = new BehaviorSubject<TotalContributionsQuery>({});
  data$ = this.dataSub.asObservable();

  constructor() {}

  updateTwentyDataSub(data: TotalContributionsQuery) {
    this.twentyDataSub.next(data);
  }

  updateNineteenDataSub(data: TotalContributionsQuery) {
    this.nineteenDataSub.next(data);
  }

  updateDataSub(data: TotalContributionsQuery) {
    this.dataSub.next(data);
  }
}
