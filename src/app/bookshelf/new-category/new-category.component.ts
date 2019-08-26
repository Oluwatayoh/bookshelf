import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { Subscription } from 'rxjs';
import { ShelfService } from 'src/app/services/shelf.service';
import { IShelf } from 'src/app/models/shelf';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  @Input() selectedCategory: any;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updatedCategory: EventEmitter<any> = new EventEmitter<any>();


  categoryForm: FormGroup;
  category: any = <any>{};
  subscription: Subscription;

  static formControls = () => {
    return {
      categoryName: ['', [<any>Validators.required, Validators.minLength(3)]],
      books:[[],[]]
    };
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _shelfService: ShelfService
  ) { }

  ngOnInit() {
    this.categoryForm = this._formBuilder.group(NewCategoryComponent.formControls());
    if (this.selectedCategory) {
      this.categoryForm.patchValue(this.selectedCategory);
      console.log(this.selectedCategory);
    }    
  }

  onSaveCategory() {
    const categoryModel = <IShelf>{
      categoryName: this.categoryForm.controls['categoryName'].value,
      books: this.categoryForm.controls['books'].value
    };

    this.subscription = this._shelfService.postCategory(categoryModel).subscribe(
      (payload) => {
        swal.fire({
          type: 'success',
          title: 'Client Saved Successfully',
          showCancelButton: false,
          timer: 1500
        });
        console.log(payload);
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

  public onUpdateCategory() {
    const categoryModel = <IShelf>{
      categoryName: this.categoryForm.controls['categoryName'].value
    };

    this.subscription = this._shelfService.updateCategory(this.selectedCategory.id, categoryModel ).subscribe(
      (payload) => {
        swal.fire({
          type: 'success',
          title: 'Client Saved Successfully',
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
}
