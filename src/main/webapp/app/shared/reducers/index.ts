import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import home, { TripState } from 'app/modules/home/home.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import trip, {
  TripState
} from 'app/entities/trip/trip.reducer';
// prettier-ignore
import ticket, {
  TicketState
} from 'app/entities/ticket/ticket.reducer';
// prettier-ignore
import payment, {
  PaymentState
} from 'app/entities/payment/payment.reducer';
// prettier-ignore
import checkPayment, {
  CheckPaymentState
} from 'app/entities/check-payment/check-payment.reducer';
// prettier-ignore
import creditCard, {
  CreditCardState
} from 'app/entities/credit-card/credit-card.reducer';
// prettier-ignore
import flightReservation, {
  FlightReservationState
} from 'app/entities/flight-reservation/flight-reservation.reducer';
// prettier-ignore
import flight, {
  FlightState
} from 'app/entities/flight/flight.reducer';
// prettier-ignore
import hotelReservation, {
  HotelReservationState
} from 'app/entities/hotel-reservation/hotel-reservation.reducer';
// prettier-ignore
import hotel, {
  HotelState
} from 'app/entities/hotel/hotel.reducer';
// prettier-ignore
import hotelRoom, {
  HotelRoomState
} from 'app/entities/hotel-room/hotel-room.reducer';
// prettier-ignore
import chosenAttraction, {
  ChosenAttractionState
} from 'app/entities/chosen-attraction/chosen-attraction.reducer';
// prettier-ignore
import attraction, {
  AttractionState
} from 'app/entities/attraction/attraction.reducer';
// prettier-ignore
import insurance, {
  InsuranceState
} from 'app/entities/insurance/insurance.reducer';
// prettier-ignore
import carRental, {
  CarRentalState
} from 'app/entities/car-rental/car-rental.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly home: TripState;
  readonly trip: TripState;
  readonly ticket: TicketState;
  readonly payment: PaymentState;
  readonly checkPayment: CheckPaymentState;
  readonly creditCard: CreditCardState;
  readonly flightReservation: FlightReservationState;
  readonly flight: FlightState;
  readonly hotelReservation: HotelReservationState;
  readonly hotel: HotelState;
  readonly hotelRoom: HotelRoomState;
  readonly chosenAttraction: ChosenAttractionState;
  readonly attraction: AttractionState;
  readonly insurance: InsuranceState;
  readonly carRental: CarRentalState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  home,
  trip,
  ticket,
  payment,
  checkPayment,
  creditCard,
  flightReservation,
  flight,
  hotelReservation,
  hotel,
  hotelRoom,
  chosenAttraction,
  attraction,
  insurance,
  carRental,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
