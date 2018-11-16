import { IHotelReservation } from 'app/shared/model//hotel-reservation.model';
import { IHotel } from 'app/shared/model//hotel.model';

export interface IHotelRoom {
  id?: number;
  maxCapacity?: number;
  isReserved?: boolean;
  roomType?: string;
  price?: number;
  hotelReservation?: IHotelReservation;
  hotel?: IHotel;
}

export const defaultValue: Readonly<IHotelRoom> = {
  isReserved: false
};
