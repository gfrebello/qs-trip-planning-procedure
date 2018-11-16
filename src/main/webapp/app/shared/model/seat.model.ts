import { IFlight } from 'app/shared/model//flight.model';
import { IFlightReservation } from 'app/shared/model//flight-reservation.model';

export interface ISeat {
  id?: number;
  number?: string;
  row?: string;
  customerClass?: string;
  isReserved?: boolean;
  flight?: IFlight;
  flightReservation?: IFlightReservation;
}

export const defaultValue: Readonly<ISeat> = {
  isReserved: false
};
