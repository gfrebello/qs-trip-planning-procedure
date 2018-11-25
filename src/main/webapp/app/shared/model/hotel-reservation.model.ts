import { Moment } from 'moment';
import { IHotelRoom } from 'app/shared/model//hotel-room.model';
import { ITrip } from 'app/shared/model//trip.model';

export interface IHotelReservation {
  id?: number;
  numberOfPeople?: number;
  checkinDate?: Moment;
  checkoutDate?: Moment;
  totalPrice?: number;
  hotelRooms?: IHotelRoom[];
  trip?: ITrip;
}

export const defaultValue: Readonly<IHotelReservation> = {};
