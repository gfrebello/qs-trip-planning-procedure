import { IChosenAttraction } from 'app/shared/model//chosen-attraction.model';

export interface IAttraction {
  id?: number;
  name?: string;
  type?: string;
  city?: string;
  price?: number;
  chosenAttraction?: IChosenAttraction;
}

export const defaultValue: Readonly<IAttraction> = {};
