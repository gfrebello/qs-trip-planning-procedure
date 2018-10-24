import { Moment } from 'moment';
import { IHotel } from 'app/shared/model//hotel.model';
import { ITrip } from 'app/shared/model//trip.model';

export interface IHotelReservation {
  id?: number;
  reservationId?: string;
  numberOfPeople?: number;
  onlinePaymentChoosen?: boolean;
  checkinDate?: Moment;
  checkoutDate?: Moment;
  price?: number;
  hotels?: IHotel[];
  trip?: ITrip;
}

export const defaultValue: Readonly<IHotelReservation> = {
  onlinePaymentChoosen: false
};
