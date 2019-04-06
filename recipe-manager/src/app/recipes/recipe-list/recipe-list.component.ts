import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  sub: Subscription;

  constructor(private recipeSrv: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.recipeSrv.recipesChanged.subscribe(
        (recipes: Recipe[]) => {
            this.recipes = recipes;
        });
    this.recipes = this.recipeSrv.getRecipes();
  }
  
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
