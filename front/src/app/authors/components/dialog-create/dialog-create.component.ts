import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/shared/interfaces/Author.interface';
import { v4 } from 'uuid';

@Component({
  selector: 'app-authors',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.scss'],
})
export class AuthorCreateDialog implements OnInit {
  authorForm!: FormGroup;
  formFirstName = new FormControl(null, Validators.required);
  formSecondName = new FormControl(null, Validators.required);
  formPatronymic = new FormControl(null, Validators.required);
  formDob = new FormControl(null, Validators.required);

  constructor(
    public dialogRef: MatDialogRef<AuthorCreateDialog>,
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    this.author.firstName = this.authorForm.value.firstName;
    this.author.secondName = this.authorForm.value.secondName;
    this.author.patronymic = this.authorForm.value.patronymic;
    this.author.dob =
      this.authorForm.value.dob < 0 ? 0 : this.authorForm.value.dob;
    this.author.id = v4();
  }
}
