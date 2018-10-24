import { IHotel } from 'app/shared/model//hotel.model';

export interface IHotelRoom {
  id?: number;
  numberOfPeople?: number;
  price?: number;
  available?: boolean;
  type?: string;
  hotel?: IHotel;
}

export const defaultValue: Readonly<IHotelRoom> = {
  available: false
};
