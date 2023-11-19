import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthorCreateDialog } from './authors/components/dialog-create/dialog-create.component';
import { BookCreateDialog } from './books/components/dialog-create/dialog-create.component';
import { ButtonComponent } from './shared/UI/button/button.component';
import { InputComponent } from './shared/UI/input/input.component';
import { TableDataDirective } from './shared/directives/table-data.directive';
import { AuthorUpdateDialog } from './authors/components/dialog-update/dialog-update.component';
import { BookUpdateDialog } from './books/components/dialog-update/dialog-update.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    BooksComponent,
    TableComponent,
    AuthorCreateDialog,
    BookCreateDialog,
    ButtonComponent,
    InputComponent,
    TableDataDirective,
    AuthorUpdateDialog,
    BookUpdateDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
