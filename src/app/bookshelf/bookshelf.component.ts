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
  books: IBooks[] = [];
  bookChunks: IBooks[] = [];
  selectedCategory: IShelf;
  selectedBook: IBooks;
  subscription: Subscription;
  private pagination = {
    page: 0,
    length: 0,
    array_chunks: []
  };

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

  onShowAddNewBook() {
    this.subscription = this._shelfService.getBooksByCategoryId(this.selectedCategory.id)
    .subscribe(data => this.books = data);
    console.log(this.books)
    this.newBook = true;
  }

  private chunkBookArray(chunk_size) {
    const results = [];
    while (this.books.length) {
      results.push(this.books.splice(0, chunk_size));
    }
    return results;
  }

  public loadMoreCategories() {
    if (this.pagination.page < this.pagination.length) {
      this.books = this.bookChunks.concat(this.pagination.array_chunks[this.pagination.page]);
      this.pagination.page += 1;
    }
  }

  onSelectedBook(book){
    this.selectedBook = book;
    console.log(this.selectedBook);
  }

  close_onClick(e) {
    this.newCategory = false;
    this.newBook = false;
    this.getCategory();
    // this.getUpdatedCategory(e);
  }

  onSelectedCategory(category) {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
    this.bookshow = true;
  }

  // public getUpdatedCategory(category) {
  //   console.log(this.selectedCategory);
  //   if (this.selectedCategory || this.selectedCategory === 0) {
  //     this.categories.splice(this.selectedCategory['index'], 1, category.data);
  //   }
  // }

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



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
