import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];
  
    getIngredients() {
        // return a copy of private array
        return this.ingredients.slice();
    }
    
    getIngredient(idx: number): Ingredient {
        return this.ingredients[idx];
    }
    
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    addIngredients(ingredients: Ingredient[]) {
        // Use ES6 spread operator to convert array to list
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    updateIngredient(idx: number, ingredient: Ingredient) {
        this.ingredients[idx] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    deleteIngredient(idx: number) {
        this.ingredients.splice(idx, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
}