import { Moment } from 'moment';

export interface ITrip {
  id?: number;
  tripId?: string;
  paymentDone?: boolean;
  numberOfPeople?: number;
  departureDate?: Moment;
  returnDate?: Moment;
  origin?: string;
  destination?: string;
}

export const defaultValue: Readonly<ITrip> = {
  paymentDone: false
};
