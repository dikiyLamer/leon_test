import { Injectable } from '@angular/core';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { Book } from 'src/app/shared/interfaces/Book.interface';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';

@Injectable({ providedIn: 'root' })
export class BooksService {
  constructor(private localStorageService: LocalStorageService) {}

  getBooks() {
    return this.localStorageService.getItem('books');
  }

  createBook(book: Book) {
    let books: Book[] = this.localStorageService.getItem('books');
    if (!books) {
      this.localStorageService.setItem('books', []);
      books = [];
    }
    books.push(book);
    this.localStorageService.setItem('books', books);
    return books;
  }

  updateBook(book: Book) {
    let books: Book[] = this.localStorageService.getItem('books');

    books = books.map((elem) => (elem.id === book.id ? book : elem));
    this.localStorageService.setItem('books', books);

    return books;
  }

  deleteBook(id: string) {
    let books: Book[] = this.localStorageService.getItem('books');
    books = books.filter((book) => book.id !== id);
    this.localStorageService.setItem('books', books);
    return books;
  }
}
