import { Moment } from 'moment';

export interface IInsurance {
  id?: number;
  type?: string;
  price?: number;
  personName?: string;
  startDate?: Moment;
  endDate?: Moment;
}

export const defaultValue: Readonly<IInsurance> = {};
