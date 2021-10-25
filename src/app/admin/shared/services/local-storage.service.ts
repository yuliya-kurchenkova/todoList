import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public get(key: string): any {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

}