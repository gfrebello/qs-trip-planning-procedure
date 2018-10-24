import { Moment } from 'moment';
import { ITrip } from 'app/shared/model//trip.model';

export interface IInsurance {
  id?: number;
  type?: string;
  price?: number;
  personName?: string;
  startDate?: Moment;
  endDate?: Moment;
  trip?: ITrip;
}

export const defaultValue: Readonly<IInsurance> = {};
