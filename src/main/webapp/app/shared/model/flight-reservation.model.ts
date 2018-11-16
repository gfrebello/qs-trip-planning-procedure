import { ISeat } from 'app/shared/model//seat.model';
import { IFlight } from 'app/shared/model//flight.model';
import { ITrip } from 'app/shared/model//trip.model';

export interface IFlightReservation {
  id?: number;
  numberOfExecutive?: number;
  numberOfEconomic?: number;
  totalPrice?: number;
  seats?: ISeat[];
  flight?: IFlight;
  trip?: ITrip;
}

export const defaultValue: Readonly<IFlightReservation> = {};
