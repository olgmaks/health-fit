import { Component, OnInit } from '@angular/core';
import {FoodModel} from '../models/food-model';
import {FoodService} from '../services/food-service.service';
import {Users2Foods} from '../models/users2foods';

@Component({
  selector: 'app-eating-day',
  templateUrl: './eating-day.component.html',
  styleUrls: ['./eating-day.component.css']
})
export class EatingDayComponent implements OnInit {

  foods: Users2Foods[];

  foodTotal: FoodModel = {};

  today: number = Date.now();

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.foodService.getDayFoodsForCurrentUser().subscribe(users2foods => {
      this.foods = users2foods;
    });

    this.foodService.getDayTotalForCurrentUser().subscribe(food => this.foodTotal = food);
  }

  onRemoveFood(food: Users2Foods) {
    this.foodService.removeFoodForCurrentUser(food);
  }
}
