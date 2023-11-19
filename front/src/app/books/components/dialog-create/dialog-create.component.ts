import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { Author } from 'src/app/shared/interfaces/Author.interface';
import { Book } from 'src/app/shared/interfaces/Book.interface';
import { v4 } from 'uuid';

@Component({
  selector: 'app-authors',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.scss'],
})
export class BookCreateDialog implements OnInit {
  bookForm!: FormGroup;
  authors: Author[] = [];
  formAuthor = new FormControl(null, Validators.required);
  formName = new FormControl(null, Validators.required);
  formPublisher = new FormControl(null, Validators.required);
  formYear = new FormControl(null, Validators.required);
  constructor(
    public dialogRef: MatDialogRef<BookCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private authorsService: AuthorsService
  ) {}
  ngOnInit(): void {
    this.bookForm = new FormGroup({
      author: this.formAuthor,
      name: this.formName,
      publisher: this.formPublisher,
      year: this.formYear,
    });

    this.authors = this.authorsService.getAuthors();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    this.book.author = this.authorsService.getAuthorById(
      this.bookForm.value.author
    )!;
    this.book.name = this.bookForm.value.name;
    this.book.publisher = this.bookForm.value.publisher;
    this.book.year = this.bookForm.value.year;
    this.book.id = v4();
  }
}
