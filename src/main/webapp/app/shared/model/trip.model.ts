import { Moment } from 'moment';
import { IPayment } from 'app/shared/model//payment.model';
import { IFlightReservation } from 'app/shared/model//flight-reservation.model';
import { IHotelReservation } from 'app/shared/model//hotel-reservation.model';
import { IInsurance } from 'app/shared/model//insurance.model';
import { ICarRental } from 'app/shared/model//car-rental.model';
import { ITicket } from 'app/shared/model//ticket.model';
import { IChosenAttraction } from 'app/shared/model//chosen-attraction.model';
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
  payment?: IPayment;
  flightReservation?: IFlightReservation;
  hotelReservation?: IHotelReservation;
  insurance?: IInsurance;
  carRental?: ICarRental;
  tickets?: ITicket[];
  chosenAttractions?: IChosenAttraction[];
  user?: IUser;
}

export const defaultValue: Readonly<ITrip> = {
  paymentDone: false
};
