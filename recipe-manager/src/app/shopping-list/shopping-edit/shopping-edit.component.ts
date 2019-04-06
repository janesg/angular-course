import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('itemForm') iForm: NgForm;
  sub: Subscription;
  editMode = false;
  editItemIdx: number;
  editItem: Ingredient;
  
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.sub = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIdx = index;
        this.editItem = this.slService.getIngredient(index);
        this.iForm.setValue({
          iName: this.editItem.name,
          iAmount: this.editItem.amount
        })
    });
  }
  
  onSubmit(form: NgForm) {
    const ingredient = new Ingredient(form.value.iName, form.value.iAmount);

    if (this.editMode) {
      this.slService.updateIngredient(this.editItemIdx, ingredient);
    } else {
      this.slService.addIngredient(ingredient);
    }
    
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.iForm.reset();
  }
  
  onDelete() {
    this.slService.deleteIngredient(this.editItemIdx);
    this.onClear();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
