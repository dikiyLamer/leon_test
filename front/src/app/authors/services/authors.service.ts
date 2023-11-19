import { Injectable } from '@angular/core';
import { Author } from 'src/app/shared/interfaces/Author.interface';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
  constructor(private localStorageService: LocalStorageService) {}

  getAuthors() {
    return this.localStorageService.getItem('authors');
  }

  getAuthorById(id: string) {
    let authors: Author[] = this.localStorageService.getItem('authors');
    return authors.find((elem) => elem.id === id);
  }

  createAuthor(author: Author) {
    let authors: Author[] = this.localStorageService.getItem('authors');
    if (!authors) {
      this.localStorageService.setItem('authors', []);
      authors = [];
    }
    if (
      !authors.find(
        (existAuthor) =>
          existAuthor.firstName === author.firstName &&
          existAuthor.secondName === author.secondName &&
          existAuthor.patronymic === author.patronymic
      )
    ) {
      authors.push(author);
      this.localStorageService.setItem('authors', authors);
    }

    return authors;
  }

  updateAuthor(author: Author) {
    let authors: Author[] = this.localStorageService.getItem('authors');
    if (
      !authors.find(
        (existAuthor) =>
          existAuthor.firstName === author.firstName &&
          existAuthor.secondName === author.secondName &&
          existAuthor.patronymic === author.patronymic &&
          existAuthor.id !== author.id
      )
    ) {
      authors = authors.map((elem) => (elem.id === author.id ? author : elem));
      this.localStorageService.setItem('authors', authors);
    }

    return authors;
  }

  deleteAuthor(id: string) {
    let authors: Author[] = this.localStorageService.getItem('authors');
    authors = authors.filter((author) => author.id !== id);
    this.localStorageService.setItem('authors', authors);
    return authors;
  }
}
