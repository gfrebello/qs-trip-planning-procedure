import { Moment } from 'moment';
import { IAttraction } from 'app/shared/model//attraction.model';
import { ITrip } from 'app/shared/model//trip.model';

export interface IAttractionReservation {
  id?: number;
  isReserved?: boolean;
  reservationDate?: Moment;
  attraction?: IAttraction;
  trip?: ITrip;
}

export const defaultValue: Readonly<IAttractionReservation> = {
  isReserved: false
};
