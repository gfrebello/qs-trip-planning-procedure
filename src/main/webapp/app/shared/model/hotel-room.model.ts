import { IHotel } from 'app/shared/model//hotel.model';
import { IHotelReservation } from 'app/shared/model//hotel-reservation.model';

export interface IHotelRoom {
  id?: number;
  maxCapacity?: number;
  isReserved?: boolean;
  roomType?: string;
  price?: number;
  hotel?: IHotel;
  hotelReservations?: IHotelReservation[];
}

export const defaultValue: Readonly<IHotelRoom> = {
  isReserved: false
};
