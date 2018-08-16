export interface FoodModel {
  id?: string;
  name?: {
    en: string;
    ua: string;
  };
  caloricity?: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
  gi?: number;
  localizedName?: string;
}
