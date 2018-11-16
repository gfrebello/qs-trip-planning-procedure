import { Moment } from 'moment';
import { IHotelReservation } from 'app/shared/model//hotel-reservation.model';
import { IInsurance } from 'app/shared/model//insurance.model';
import { ICarRental } from 'app/shared/model//car-rental.model';
import { IFlightReservation } from 'app/shared/model//flight-reservation.model';
import { IAttractionReservation } from 'app/shared/model//attraction-reservation.model';
import { IPassenger } from 'app/shared/model//passenger.model';
import { IUser } from './user.model';

export interface ITrip {
  id?: number;
  tripId?: string;
  paymentDone?: boolean;
  numberOfPeople?: number;
  departureDate?: Moment;
  returnDate?: Moment;
  origin?: string;
  destination?: string;
  hotelReservation?: IHotelReservation;
  insurance?: IInsurance;
  carRental?: ICarRental;
  flightReservations?: IFlightReservation[];
  attractionReservations?: IAttractionReservation[];
  passengers?: IPassenger[];
  user?: IUser;
}

export const defaultValue: Readonly<ITrip> = {
  paymentDone: false
};
