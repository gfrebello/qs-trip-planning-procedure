import { ITrip } from 'app/shared/model//trip.model';

export interface IPayment {
  id?: number;
  amount?: number;
  trip?: ITrip;
}

export const defaultValue: Readonly<IPayment> = {};
