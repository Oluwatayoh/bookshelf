import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  bookForm: FormGroup;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.bookForm = this._formBuilder.group({
      selectedCategoryId: ['', []],
      bookName: ['', []],
      author: ['', []],
    });
  }

  close_onClick() {
    this.closeModal.emit(true);
  }

}
