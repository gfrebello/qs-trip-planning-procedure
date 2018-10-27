import { Moment } from 'moment';
import { IHotelRoom } from 'app/shared/model//hotel-room.model';
import { ITrip } from 'app/shared/model//trip.model';

export interface IHotelReservation {
  id?: number;
  reservationId?: string;
  numberOfPeople?: number;
  onlinePaymentChoosen?: boolean;
  checkinDate?: Moment;
  checkoutDate?: Moment;
  hotelRooms?: IHotelRoom[];
  trip?: ITrip;
}

export const defaultValue: Readonly<IHotelReservation> = {
  onlinePaymentChoosen: false
};
