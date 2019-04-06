import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          this.recipeId = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }
  
  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['rName'],
      this.recipeForm.value['rDescription'],
      this.recipeForm.value['rImagePath'],
      this.recipeForm.value['rIngredients']
    );
    
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, newRecipe);
      // Because I intentionally used different FormGroup names (i.e. 'r..')
      // I'm not able to use this short-cut form as attributes names don't align
      //this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(newRecipe);
      // Because I intentionally used different FormGroup names (i.e. 'r..')
      // I'm not able to use this short-cut form as attributes names don't align
      //this.recipeService.addRecipe(this.recipeForm.value);
    }
    
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
  onAddIngredient() {
    (<FormArray> this.recipeForm.get('rIngredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, 
                                    [Validators.required,
                                     Validators.pattern(/^[1-9]*[0-9]*$/)])
        })
      );
  }

  onDeleteIngredient(idx: number) {
    (<FormArray> this.recipeForm.get('rIngredients')).removeAt(idx);
  }
  
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeId);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      
      if (recipe['ingredients']) {
        for (let i of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(i.name, Validators.required),
              'amount': new FormControl(i.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]*[0-9]*$/)
                ])
            })
          );
        }        
      }
    }
    
    this.recipeForm = new FormGroup({
      'rName': new FormControl(recipeName, Validators.required),
      'rImagePath': new FormControl(recipeImagePath, Validators.required),
      'rDescription': new FormControl(recipeDescription, Validators.required),
      'rIngredients': recipeIngredients
    });
  }
  
}
