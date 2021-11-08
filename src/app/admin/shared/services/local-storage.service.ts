import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public set(key: string, data: any): void {
    localStorage.setItem(key, data);
  };

  public get(key: string): string | null {
    return localStorage.getItem(key);
  };

  public remove(key: string): void {
    localStorage.removeItem(key);
  };

}
