import { Injectable } from '@angular/core';
import { Book } from '../interfaces/Book.interface';
import { Author } from '../interfaces/Author.interface';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getItem(key: string) {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return null;
  }
  setItem(key: string, item: Book[] | Author[]) {
    return localStorage.setItem(key, JSON.stringify(item));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
