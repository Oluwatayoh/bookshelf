import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShelfService } from 'src/app/services/shelf.service';
import { Subscription } from 'rxjs';
import { IShelf } from 'src/app/models/shelf';
import { IBooks } from 'src/app/models/books';

import swal from 'sweetalert2';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  @Input() selectedCategory: any;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updatedCategory: EventEmitter<any> = new EventEmitter<any>();

  bookForm: FormGroup;
  category: any = <any>{};
  subscription: Subscription;

  static formControls = () => {
    return {
      categoryName: ['', []],
      bookId: [''],
      bookName: ['', [<any>Validators.required, Validators.minLength(3)]],
      author: ['', [<any>Validators.required, Validators.minLength(3)]],
      isFavourite: Boolean
    };
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _shelfService: ShelfService
  ) { }

  ngOnInit() {
    this.bookForm = this._formBuilder.group(NewBookComponent.formControls());
    if (this.selectedCategory) {
      this.bookForm.patchValue({
        categoryName: this.selectedCategory.categoryName,
        bookName: this.selectedCategory.id,
        author: this.selectedCategory.books.author,
        isFavourite: this.selectedCategory.books.isFavourite
      });
      console.log(this.selectedCategory);
    }
  }

  callData(){

  }

  onSaveBook() {
    const bookModel = <IBooks>{
      bookId: this.randomID(),
      bookName: this.bookForm.controls['bookName'].value,
      author: this.bookForm.controls['author'].value,
      isFavourite: this.bookForm.controls['isFavourite'].value
    };
    this.selectedCategory.books.push(bookModel);
    this._shelfService.updateCategory(this.selectedCategory.id, this.selectedCategory).subscribe(
      (payload) => {
        swal.fire({
          type: 'success',
          title: 'Book Saved Successfully',
          showCancelButton: false,
          timer: 1500
        });
        console.log(payload);
        this.updatedCategory.emit(payload);
        this.close_onClick();
      },
      (error) => {
        swal.fire({
          type: 'warning',
          title: 'Error Occur while registering',
          showConfirmButton: false,
          timer: 1500
        });
        this.close_onClick();
      });
  }

  close_onClick() {
    this.closeModal.emit(true);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  randomID() {
    var text = "";
    var possible =  "ABCDYHHHasds88466w";
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.random() * possible.length);

    return text;
  }
}
