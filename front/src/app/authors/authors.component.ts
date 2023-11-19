import { Component, OnInit } from '@angular/core';
import { AuthorsService } from './services/authors.service';
import { Author } from '../shared/interfaces/Author.interface';
import { DisplayedColumns } from '../shared/interfaces/DisplayedColumns.interface';
import { MatDialog } from '@angular/material/dialog';
import { AuthorCreateDialog } from './components/dialog-create/dialog-create.component';
import { SortInfo } from '../shared/interfaces/sort-info.interface';
import { AuthorUpdateDialog } from './components/dialog-update/dialog-update.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  displayedColumns: DisplayedColumns[] = [
    { name: 'id', alias: 'id' },
    { name: 'firstName', alias: 'Имя' },
    { name: 'secondName', alias: 'Фамилия', sort: true },
    { name: 'patronymic', alias: 'Отчество' },
    { name: 'dob', alias: 'Дата рождения' },
  ];
  constructor(
    private authorsService: AuthorsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authors = this.authorsService.getAuthors();
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AuthorCreateDialog, {
      data: {},
      width: '600px',
      height: '275px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.authors = this.authorsService.createAuthor(result);
    });
  }

  openDialogUpdate(author: Author): void {
    const dialogRef = this.dialog.open(AuthorUpdateDialog, {
      data: author,
      width: '600px',
      height: '275px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        if (typeof result === 'string') {
          this.authors = this.authorsService.deleteAuthor(result);
        } else {
          this.authors = this.authorsService.updateAuthor(result);
        }
      }
    });
  }

  sortByColumn(sortInfo: SortInfo) {
    this.authors = this.authors.sort((a: any, b: any) => {
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
