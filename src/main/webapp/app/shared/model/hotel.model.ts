import { IHotelRoom } from 'app/shared/model//hotel-room.model';
import { IHotelReservation } from 'app/shared/model//hotel-reservation.model';

export interface IHotel {
  id?: number;
  name?: string;
  city?: string;
  address?: string;
  type?: string;
  hotelRooms?: IHotelRoom[];
  hotelReservation?: IHotelReservation;
}

export const defaultValue: Readonly<IHotel> = {};
