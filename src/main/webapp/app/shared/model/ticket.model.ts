import { ITrip } from 'app/shared/model//trip.model';

export interface ITicket {
  id?: number;
  type?: string;
  reservationId?: string;
  trip?: ITrip;
}

export const defaultValue: Readonly<ITicket> = {};
