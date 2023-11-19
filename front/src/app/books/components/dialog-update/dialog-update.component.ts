import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { Author } from 'src/app/shared/interfaces/Author.interface';
import { Book } from 'src/app/shared/interfaces/Book.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.scss'],
})
export class BookUpdateDialog implements OnInit {
  bookForm!: FormGroup;
  authors: Author[] = [];
  formAuthor = new FormControl(this.book.author, Validators.required);
  formName = new FormControl(this.book.name, Validators.required);
  formPublisher = new FormControl(this.book.publisher, Validators.required);
  formYear = new FormControl(this.book.year, Validators.required);

  constructor(
    public dialogRef: MatDialogRef<BookUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private authorsService: AuthorsService
  ) {}
  ngOnInit(): void {
    console.log(this.book);

    this.bookForm = new FormGroup({
      author: this.formAuthor,
      name: this.formName,
      publisher: this.formPublisher,
      year: this.formYear,
    });

    this.authors = this.authorsService.getAuthors();

    this.bookForm.patchValue({
      author: this.book.author.id, // Выберите год, который хотите установить по умолчанию
    });
  }

  onOkClick() {
    this.book.author = this.authorsService.getAuthorById(
      this.bookForm.value.author
    )!;
    this.book.name = this.bookForm.value.name;
    this.book.publisher = this.bookForm.value.publisher;
    this.book.year =
      this.bookForm.value.year < 0 ? 0 : this.bookForm.value.year;
  }

  onDeleteClick() {
    this.dialogRef.close(this.book.id);
  }
}
