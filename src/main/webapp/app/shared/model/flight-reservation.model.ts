import { IFlight } from 'app/shared/model//flight.model';
import { ITrip } from 'app/shared/model//trip.model';

export interface IFlightReservation {
  id?: number;
  reservationId?: string;
  numberOfPeople?: number;
  customerClass?: string;
  flights?: IFlight[];
  trip?: ITrip;
}

export const defaultValue: Readonly<IFlightReservation> = {};
