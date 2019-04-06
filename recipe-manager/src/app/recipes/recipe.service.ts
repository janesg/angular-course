import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    
    private recipes: Recipe[] = [
      new Recipe('A Test Recipe', 
                 'This is a simple test of recipes', 
                 'https://images.pexels.com/photos/48726/pexels-photo-48726.jpeg',
                 [new Ingredient('Eggs', 14), new Ingredient('Butter', 2)]),
      new Recipe('Top Scoff', 
                 'A veritable feast', 
                 'https://c1.staticflickr.com/5/4005/4471191921_19cc29abbe_m.jpg',
                 [new Ingredient('Whelks', 24), new Ingredient('Chilli Sauce', 7)])
    ];

    recipesChanged = new Subject<Recipe[]>();
    
    constructor(private slService: ShoppingListService) {}
    
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
  
    getRecipes() {
        // returns a copy of the private array
        return this.recipes.slice();
    }
    
    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    updateRecipe(idx: number, recipe: Recipe) {
        this.recipes[idx] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    deleteRecipe(idx: number) {
        this.recipes.splice(idx, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}