import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageManagerService {
  private readonly pID = inject(PLATFORM_ID);

  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.pID)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  getItem(key: string) {
    if (isPlatformBrowser(this.pID)) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }
  removeItem(key: string): void {
    if (isPlatformBrowser(this.pID)) {
      localStorage.removeItem(key);
    }
  }
  clear(): void {
    if (isPlatformBrowser(this.pID)) {
      localStorage.clear();
    }
  }
}
