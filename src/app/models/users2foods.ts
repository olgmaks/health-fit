import {UserModel} from './user-model';
import {FoodModel} from './food-model';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {DocumentReference} from 'angularfire2/firestore';

export interface Users2Foods {
  id?: string;
  userRef?: DocumentReference;
  foodRef?: DocumentReference;
  time: Timestamp;
  foodCalculated: FoodModel;
  weight: number;
}
