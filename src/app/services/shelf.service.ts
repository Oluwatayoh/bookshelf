import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IShelf } from '../models/shelf';
import { Observable, Subject } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';
import { IBooks } from '../models/books';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  private _url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getCategory(): Observable<IShelf[]> {
    return this.http.get<IShelf[]>(this._url + '/categories')
      .pipe(
        retry(1)
      );
  }

  // getBooksByCategoryId(id: number): Observable<any> {
  //   return this.http.get<any>( this._url + '/categories/' + id)
  // }

  getByCategoryId(id: number): Observable<any> {
    return this.http.get<any>( this._url + '/categories/' + id)
  }

  postCategory(category) {
    return this.http.post<any>(this._url + '/categories', JSON.stringify(category), this.options)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteCategory(id) {
    return this.http.delete<IShelf>(this._url + '/categories/' + id, this.options)
      .pipe(
        retry(1)
      )
  }

  deleteBook(bookId) {
    return this.http.delete<IShelf>(this._url + '/categories/books' + bookId, this.options)
      .pipe(
        retry(1)
      )
  }

  updateCategory(id, category): Observable<IShelf[]> {
    return this.http.put<IShelf[]>(this._url + '/categories/' + id, JSON.stringify(category), this.options)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }


}
