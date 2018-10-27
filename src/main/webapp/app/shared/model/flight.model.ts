import { Moment } from 'moment';

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
}

export const defaultValue: Readonly<IFlight> = {};
