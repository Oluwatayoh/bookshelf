import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent implements OnInit {

  categoryListEmpty = true;
  categoryListShow = false;
  newBook = false;
  bookshow = false;
  bookButton = false;
  newCategory = false;
  constructor() { }

  ngOnInit() {
  }


  close_onClick(e) {
    this.newCategory = false;
    this.newBook = false;
  }

  onSelectedCategory(){
    this.bookshow = true;
  }

  onShowNewCategory() {
    this.newCategory = true;
    this.bookButton = true;
    this.categoryListEmpty = false;
    this.categoryListShow = true;
  }

  onShowAddNewBook(){
    this.newBook = true;
  }
}
