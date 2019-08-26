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

  updateCategory(id, category): Observable<IShelf[]> {
    return this.http.put<IShelf[]>(this._url + '/categories/' + id, JSON.stringify(category), this.options)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  postBook(id, book) {
    return this.http.post<IBooks[]>(this._url + '/categories/' + id, JSON.stringify(book), this.options)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  getBooksByCategoryId(id): Observable<IBooks[]> {
    return this.http.get<IBooks[]>(this._url + '/categories/' + id)
      .pipe(
        retry(1)
      );
  }
}
