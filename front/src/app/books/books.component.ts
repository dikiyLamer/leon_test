import { Component, OnInit } from '@angular/core';
import { BooksService } from './services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookCreateDialog } from './components/dialog-create/dialog-create.component';
import { Book } from '../shared/interfaces/Book.interface';
import { DisplayedColumns } from '../shared/interfaces/DisplayedColumns.interface';
import { SortInfo } from '../shared/interfaces/sort-info.interface';
import { BookUpdateDialog } from './components/dialog-update/dialog-update.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  displayedColumns: DisplayedColumns[] = [
    { name: 'id', alias: 'id' },
    { name: 'author', alias: 'Автор', sort: true },
    { name: 'name', alias: 'Название', sort: true },
    { name: 'publisher', alias: 'Издатель', sort: true },
    { name: 'year', alias: 'Год', sort: true },
  ];
  constructor(private booksService: BooksService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.books = this.booksService.getBooks();
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(BookCreateDialog, {
      data: {},
      width: '600px',
      height: '275px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.books = this.booksService.createBook(result);
    });
  }

  openDialogUpdate(book: Book): void {
    const dialogRef = this.dialog.open(BookUpdateDialog, {
      data: book,
      width: '600px',
      height: '275px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        if (typeof result === 'string') {
          this.books = this.booksService.deleteBook(result);
        } else {
          this.books = this.booksService.updateBook(result);
        }
      }
    });
  }

  sortByColumn(sortInfo: SortInfo) {
    this.books = this.books.sort((a: any, b: any) => {
      if (typeof a[sortInfo.colName] === 'object') {
        if (sortInfo.sortDirection) {
          if (
            a[sortInfo.colName].firstName + a[sortInfo.colName].secondName <
            b[sortInfo.colName].firstName + b[sortInfo.colName].secondName
          )
            return -1;
          if (
            a[sortInfo.colName].firstName + a[sortInfo.colName].secondName >
            b[sortInfo.colName].firstName + b[sortInfo.colName].secondName
          )
            return 1;
        } else {
          if (
            a[sortInfo.colName].firstName + a[sortInfo.colName].secondName >
            b[sortInfo.colName].firstName + b[sortInfo.colName].secondName
          )
            return -1;
          if (
            a[sortInfo.colName].firstName + a[sortInfo.colName].secondName <
            b[sortInfo.colName].firstName + b[sortInfo.colName].secondName
          )
            return 1;
        }
        return 0;
      }
      if (sortInfo.sortDirection) {
        if (a[sortInfo.colName] < b[sortInfo.colName]) return -1;
        if (a[sortInfo.colName] > b[sortInfo.colName]) return 1;
      } else {
        if (a[sortInfo.colName] > b[sortInfo.colName]) return -1;
        if (a[sortInfo.colName] < b[sortInfo.colName]) return 1;
      }
      return 0;
    });
  }
}
