import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../../../shared/models';
import { LOCAL_STORAGE_PRE } from '../../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get(key: LocalStorageKeys) {
    return localStorage.getItem(LOCAL_STORAGE_PRE + key);
  }

  set(key: LocalStorageKeys, value: any) {
    localStorage.setItem(LOCAL_STORAGE_PRE + key, value);
  }
}
