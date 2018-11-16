import { IFlight } from 'app/shared/model//flight.model';
import { ISeat } from 'app/shared/model//seat.model';
import { ITrip } from 'app/shared/model//trip.model';

export interface IFlightReservation {
  id?: number;
  reservationId?: string;
  numberOfPeople?: number;
  customerClass?: string;
  flight?: IFlight;
  seats?: ISeat[];
  trip?: ITrip;
}

export const defaultValue: Readonly<IFlightReservation> = {};
