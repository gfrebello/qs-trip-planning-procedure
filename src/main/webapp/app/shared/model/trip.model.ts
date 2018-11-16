import { Moment } from 'moment';
import { IFlightReservation } from 'app/shared/model//flight-reservation.model';
import { IAttractionReservation } from 'app/shared/model//attraction-reservation.model';
import { IPassenger } from 'app/shared/model//passenger.model';
import { IHotelReservation } from 'app/shared/model//hotel-reservation.model';
import { IInsurance } from 'app/shared/model//insurance.model';
import { ICarRental } from 'app/shared/model//car-rental.model';
import { IUser } from './user.model';

export interface ITrip {
  id?: number;
  numberOfPeople?: number;
  departureDate?: Moment;
  returnDate?: Moment;
  origin?: string;
  destination?: string;
  flightReservations?: IFlightReservation[];
  attractionReservations?: IAttractionReservation[];
  passengers?: IPassenger[];
  hotelReservations?: IHotelReservation[];
  insurances?: IInsurance[];
  carRentals?: ICarRental[];
  user?: IUser;
}

export const defaultValue: Readonly<ITrip> = {};
