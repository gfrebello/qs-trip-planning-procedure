import { Moment } from 'moment';
import { IFlightReservation } from 'app/shared/model//flight-reservation.model';

export interface IFlight {
  id?: number;
  company?: string;
  origin?: string;
  destination?: string;
  avaibleSeats?: number;
  departureDate?: Moment;
  arrivalDate?: Moment;
  flightCode?: string;
  departAirport?: string;
  arrivalAirport?: string;
  flightReservations?: IFlightReservation[];
}

export const defaultValue: Readonly<IFlight> = {};
