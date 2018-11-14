import { IHotelReservation } from 'app/shared/model//hotel-reservation.model';
import { IHotel } from 'app/shared/model//hotel.model';

export interface IHotelRoom {
  id?: number;
  maxCapacity?: number;
  available?: boolean;
  roomType?: string;
  price?: number;
  hotelReservation?: IHotelReservation;
  hotel?: IHotel;
}

export const defaultValue: Readonly<IHotelRoom> = {
  available: false
};
