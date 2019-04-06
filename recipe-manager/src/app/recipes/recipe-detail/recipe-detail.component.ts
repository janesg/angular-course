import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  
  constructor(private recipeSrv: RecipeService,
              private router: Router,
              private route: ActivatedRoute ) {}

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeSrv.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeSrv.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  
  onEditRecipe() {
    // Demonstrate how compound path can be constructed
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  
  onDeleteRecipe() {
    this.recipeSrv.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
