import { Moment } from 'moment';

export interface IHotelReservation {
  id?: number;
  reservationId?: string;
  numberOfPeople?: number;
  onlinePaymentChoosen?: boolean;
  checkinDate?: Moment;
  checkoutDate?: Moment;
  price?: number;
}

export const defaultValue: Readonly<IHotelReservation> = {
  onlinePaymentChoosen: false
};
