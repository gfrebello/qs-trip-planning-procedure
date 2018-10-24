import { Moment } from 'moment';

export interface ICreditCard {
  id?: number;
  name?: string;
  cardNumber?: string;
  safetyCode?: string;
  expirationDate?: Moment;
}

export const defaultValue: Readonly<ICreditCard> = {};
