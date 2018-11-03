import { Moment } from 'moment';
import { ISeat } from 'app/shared/model//seat.model';

export interface IFlight {
  id?: number;
  company?: string;
  origin?: string;
  destination?: string;
  availableSeats?: number;
  departureDate?: Moment;
  arrivalDate?: Moment;
  flightCode?: string;
  departAirport?: string;
  arrivalAirport?: string;
  price?: number;
  seats?: ISeat[];
}

export const defaultValue: Readonly<IFlight> = {};
