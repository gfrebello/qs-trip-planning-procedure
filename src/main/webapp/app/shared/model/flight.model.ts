import { Moment } from 'moment';

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
}

export const defaultValue: Readonly<IFlight> = {};
