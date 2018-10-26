import { Moment } from 'moment';
import { ITrip } from 'app/shared/model//trip.model';

export interface ICarRental {
  id?: number;
  carType?: string;
  rentalDays?: number;
  startDate?: Moment;
  price?: number;
  pickupAddress?: string;
  dropoffAddress?: string;
  color?: string;
  trip?: ITrip;
}

export const defaultValue: Readonly<ICarRental> = {};
