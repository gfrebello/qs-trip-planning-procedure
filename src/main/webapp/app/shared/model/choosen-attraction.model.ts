import { Moment } from 'moment';

export interface IChoosenAttraction {
  id?: number;
  isReserved?: boolean;
  reservationDate?: Moment;
}

export const defaultValue: Readonly<IChoosenAttraction> = {
  isReserved: false
};
