import {Component, OnInit} from '@angular/core';
import {FoodService} from '../services/food-service.service';
import {FoodModel} from '../models/food-model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-log-eating',
  templateUrl: './log-eating.component.html',
  styleUrls: ['./log-eating.component.css']
})
export class LogEatingComponent implements OnInit {

  foodSelected: FoodModel = {};
  foods: FoodModel[];
  newEatForm: FormGroup;
  saveButtonDisabled = false;

  constructor(private foodService: FoodService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.foodService.getFoods().subscribe(foods => this.foods = foods);
    this.newEatForm = this.formBuilder.group({
      weight: ''
    });
    this.activatedRoute.queryParams.subscribe(params => {
      const foodId = params['food'];
      if (foodId) {
        this.selectFoodForId(foodId);
      }
    });
  }

  onSelectFood(foodId: string) {
    this.selectFoodForId(foodId);
  }

  onSubmitNewEatForm() {
    this.saveButtonDisabled = true;
    const weight = this.newEatForm.value.weight;
    this.foodService.saveFoodForCurrentUser(this.foodSelected, weight)
      .subscribe(doc => {
          this.saveButtonDisabled = false;
      });
  }

  private selectFoodForId(foodId: any) {
    this.foodService.getFoodForId(foodId)
      .subscribe(food => {
        console.log('food query');
        this.foodSelected = food;
      });
  }

  getCarbForCurrentFood(weight: number) {
    return 0.01 * this.foodSelected.carbohydrates * weight;
  }

  getFatForCurrentFood(weight: number) {
    return 0.01 * this.foodSelected.fat * weight;
  }

  getProteinForCurrentFood(weight: number) {
    return 0.01 * this.foodSelected.protein * weight;
  }

  getKkalForCurrentFood(weight: number) {
    return 0.01 * this.foodSelected.caloricity * weight;
  }
}
