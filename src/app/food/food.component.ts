import {Component, OnInit} from '@angular/core';
import {FoodModel} from '../models/food-model';
import {FoodService} from '../services/food-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  foods: FoodModel[];

  foodsFiltered: FoodModel[];

  constructor(private foodService: FoodService,
              private router: Router) {
  }

  ngOnInit() {
    this.foodService.getFoods().subscribe(foods => this.foods = foods);
  }

  onJustAteClick(food: FoodModel) {
    this.router.navigate(['/log-eating'], {queryParams: {food: food.id}});
  }

  onFoodFilter($event) {
    const filteredText = $event.target.value;
    this.foodsFiltered = this.foods.filter(food =>
      food.name.en.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
    || food.name.ua.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0);
  }
}
