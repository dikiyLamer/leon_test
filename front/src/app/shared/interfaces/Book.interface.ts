import { Author } from './Author.interface';

export interface Book {
  id: string;
  author: Author;
  name: string;
  publisher: string;
  year: number;
}
