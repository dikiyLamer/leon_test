import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/shared/interfaces/Author.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.scss'],
})
export class AuthorUpdateDialog implements OnInit {
  authorForm!: FormGroup;
  formFirstName = new FormControl(this.author.firstName, Validators.required);
  formSecondName = new FormControl(this.author.secondName, Validators.required);
  formPatronymic = new FormControl(this.author.patronymic, Validators.required);
  formDob = new FormControl(this.author.dob, Validators.required);

  constructor(
    public dialogRef: MatDialogRef<AuthorUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public author: Author
  ) {}
  ngOnInit(): void {
    this.authorForm = new FormGroup({
      firstName: this.formFirstName,
      secondName: this.formSecondName,
      patronymic: this.formPatronymic,
      dob: this.formDob,
    });
  }

  onOkClick() {
    this.author.firstName = this.authorForm.value.firstName;
    this.author.secondName = this.authorForm.value.secondName;
    this.author.patronymic = this.authorForm.value.patronymic;
    this.author.dob =
      this.authorForm.value.dob < 0 ? 0 : this.authorForm.value.dob;
  }

  onDeleteClick() {
    this.dialogRef.close(this.author.id);
  }
}
