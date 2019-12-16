import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../services/shelf.service';
import { Subscription } from 'rxjs';
import { IShelf } from '../models/shelf';

import swal from 'sweetalert2';
import { IBooks } from '../models/books';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent implements OnInit {

  categories: IShelf[] = [];
  books: IShelf[] = [];
  // books: any = []; 
  selectedCategory: IShelf;
  subscription: Subscription;

  categoryListEmpty = false;
  categoryListShow = true;
  newBook = false;
  bookshow = false;
  bookButton = false;
  newCategory = false;

  constructor(private _shelfService: ShelfService) { }

  ngOnInit() {
    this.getCategory();
  }

  private getCategory() {
    this.subscription = this._shelfService.getCategory()
      .subscribe(data => this.categories = data);
    console.log(this.categories);
  }

  close_onClick(e) {
    this.newCategory = false;
    this.newBook = false;
    this.getCategory();
    this.getBooksbyCategoryId();
  }

  private getBooksbyCategoryId() {
    // get books by categoryid
    this.subscription = this._shelfService.getByCategoryId(this.selectedCategory.id)
      .subscribe(data => this.books = data.books);
      console.log(this.books)
  }

  onSelectedCategory(category) {
    this.selectedCategory = category;
    this.getBooksbyCategoryId();
    this.bookshow = true;
  }

  onShowAddNewBook() {
    this.newBook = true;
  } 

  onShowNewCategory(category?, index?) {
    if ((index || index === 0) && category) {
      this.selectedCategory = category;
      this.selectedCategory['index'] = index;
      console.log(category);
    } else {
      this.selectedCategory = null;
    }
    this.newCategory = true;
    this.bookButton = true;
    this.categoryListEmpty = false;
    this.categoryListShow = true;
  }

  onDeleteCategory(id) {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._shelfService.deleteCategory(id).subscribe(data => {
          this.getCategory();
        })
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  onDeleteBook(bookId) {
    swal.fire({
      title: 'Are you sure you want to delete this book?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._shelfService.deleteBook(bookId).subscribe(data => {
          this.getBooksbyCategoryId();
        })
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
