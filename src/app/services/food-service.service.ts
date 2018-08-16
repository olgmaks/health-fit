import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from 'angularfire2/firestore';
import {from, Observable} from 'rxjs';
import {FoodModel} from '../models/food-model';
import {UserService} from './user-services.service';
import * as firebase from 'firebase';
import {mergeMap} from 'rxjs/operators';
import {Users2Foods} from '../models/users2foods';
import Timestamp = firebase.firestore.Timestamp;
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  public static FOODS_COLLECTION = 'foods';
  public static USERS2FOODS_COLLECTION = 'users2foods';

  constructor(private storage: AngularFirestore,
              private userService: UserService) {
  }

  public saveFoodForCurrentUser(food: FoodModel, weight): Observable<DocumentReference> {
    const foodCalculated = <FoodModel>{
      caloricity: 0.01 * food.caloricity * weight,
      protein: 0.01 * food.protein * weight,
      fat: 0.01 * food.fat * weight,
      carbohydrates: 0.01 * food.carbohydrates * weight,
      id: food.id,
      gi: food.gi,
      name: food.name
    };
    return this.userService.getCurrentUserRef().pipe(mergeMap(
      userRef => from(this.storage.collection(FoodService.USERS2FOODS_COLLECTION)
        .add({
          foodRef: this.getFoodRefForId(food.id),
          foodCalculated: foodCalculated,
          userRef: userRef,
          weight: weight,
          time: Timestamp.now()
        }))));
  }

  getFoods(): Observable<FoodModel[]> {
    return this.storage
      .collection<FoodModel>(FoodService.FOODS_COLLECTION)
      .valueChanges()
      .pipe(map(foodModels => {
        foodModels.forEach(fm => {
          this.populateLocalizedName(fm);
        });
        return foodModels;
      }));
  }

  getFoodForId(id: string): Observable<FoodModel> {
    return this.storage
      .collection<FoodModel>(FoodService.FOODS_COLLECTION).doc(id).valueChanges();
  }

  getFoodRefForId(id: string): DocumentReference {
    return this.storage
      .collection<FoodModel>(FoodService.FOODS_COLLECTION).doc(id).ref;
  }

  getDayFoodsForCurrentUser(): Observable<Users2Foods[]> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    console.log(currentDate);
    return this.userService.getCurrentUserRef().pipe(mergeMap(userRef => this.storage
      .collection<Users2Foods>(FoodService.USERS2FOODS_COLLECTION,
        ref => ref
          .where('userRef', '==', userRef)
          .where('time', '>=', currentDate)
          .orderBy('time'))
      .valueChanges()
      .pipe(map(users2foods => {
        users2foods.forEach(u2f => this.populateLocalizedName(u2f.foodCalculated));
        return users2foods;
      }))));
  }

  getDayTotalForCurrentUser(): Observable<FoodModel> {
    return this.getDayFoodsForCurrentUser()
      .pipe(map(users2foods => {

        const foodModel = <FoodModel>{
          caloricity: 0.0,
          protein: 0.0,
          fat: 0.0,
          carbohydrates: 0.0
        };

        users2foods.forEach(u2f => {
          foodModel.caloricity += u2f.foodCalculated.caloricity;
          foodModel.protein += u2f.foodCalculated.protein;
          foodModel.fat += u2f.foodCalculated.fat;
          foodModel.carbohydrates += u2f.foodCalculated.carbohydrates;
        });

        return foodModel;
      }));
  }

  removeFoodForCurrentUser(users2food: Users2Foods) {
    this.storage.collection(FoodService.USERS2FOODS_COLLECTION).doc(users2food.id)
      .delete()
      .then(v => {
        console.log('Successfully removed: ' + v);
      })
      .catch(e => {
        console.log(e);
      });
  }

  populateLocalizedName(foodModel: FoodModel) {
    const local = this.userService.getLocal();
    const name = foodModel.name;
    foodModel.localizedName = name[local];
  }
}
