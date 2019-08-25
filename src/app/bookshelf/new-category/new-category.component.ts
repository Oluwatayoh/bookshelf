import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  categoryForm: FormGroup;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private _locker: CoolLocalStorage,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.categoryForm = this._formBuilder.group({
      categoryName: ['', []]
    });
  }


  close_onClick() {
    this.closeModal.emit(true);
  }
}
