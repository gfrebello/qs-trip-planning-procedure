import { Moment } from 'moment';

export interface ICarRental {
  id?: number;
  carType?: string;
  rentalDays?: number;
  startDate?: Moment;
  price?: number;
  pickupAddress?: string;
  dropoffAddress?: string;
  color?: string;
}

export const defaultValue: Readonly<ICarRental> = {};
