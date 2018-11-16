import { ITrip } from 'app/shared/model//trip.model';

export interface IPassenger {
  id?: number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  passport?: string;
  trip?: ITrip;
}

export const defaultValue: Readonly<IPassenger> = {};
