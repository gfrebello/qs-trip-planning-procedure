import { IChosenAttraction } from 'app/shared/model/chosen-attraction.model';
import { IFlightReservation } from 'app/shared/model/flight-reservation.model';
import { IHotelReservation } from 'app/shared/model/hotel-reservation.model';
import { ICarRental } from 'app/shared/model/car-rental.model';
import { IInsurance } from 'app/shared/model/insurance.model';

export const ACTION_TYPES = {
  RESET_FLIGHT_RESERVATIONS: 'reservations/RESET_FLIGHT_RESERVATIONS',
  RESET_HOTEL_RESERVATIONS: 'reservations/RESET_HOTEL_RESERVATIONS',
  RESET_ATTRACTION_RESERVATIONS: 'reservations/RESET_ATTRACTION_RESERVATIONS',
  RESET_CAR_RENTAL_RESERVATIONS: 'reservations/RESET_CAR_RENTAL_RESERVATIONS',
  RESET_INSURANCE_RESERVATIONS: 'reservations/RESET_INSURANCE_RESERVATIONS'
};

const initialState = {
  // reservedFlights: [] as ReadonlyArray<IFlightReservation>,
  reservedFlights: ['test'],
  // reservedHotels: [] as ReadonlyArray<IHotelReservation>,
  reservedHotels: ['test'],
  // chosenAttractions: [] as ReadonlyArray<IChosenAttraction>,
  chosenAttractions: ['test'],
  // rentedCars: [] as ReadonlyArray<ICarRental>,
  rentedCars: ['test'],
  // insurances: [] as ReadonlyArray<IInsurance>
  boughtInsurances: ['test']
};

export type ReservationsState = Readonly<typeof initialState>;

// Reducer
export default (state: ReservationsState = initialState, action): ReservationsState => {
  switch (action.type) {
    case ACTION_TYPES.RESET_FLIGHT_RESERVATIONS:
      return {
        ...state,
        reservedFlights: []
      };
    case ACTION_TYPES.RESET_HOTEL_RESERVATIONS:
      return {
        ...state,
        reservedHotels: []
      };
    case ACTION_TYPES.RESET_ATTRACTION_RESERVATIONS:
      return {
        ...state,
        chosenAttractions: []
      };
    case ACTION_TYPES.RESET_CAR_RENTAL_RESERVATIONS:
      return {
        ...state,
        rentedCars: []
      };
    case ACTION_TYPES.RESET_INSURANCE_RESERVATIONS:
      return {
        ...state,
        boughtInsurances: []
      };
    default:
      return state;
  }
};

// Actions
export const resetFlightReservations = () => ({
  type: ACTION_TYPES.RESET_FLIGHT_RESERVATIONS
});

export const resetHotelReservations = () => ({
  type: ACTION_TYPES.RESET_HOTEL_RESERVATIONS
});

export const resetAttractionReservations = () => ({
  type: ACTION_TYPES.RESET_ATTRACTION_RESERVATIONS
});

export const resetCarRentalReservations = () => ({
  type: ACTION_TYPES.RESET_CAR_RENTAL_RESERVATIONS
});

export const resetInsuranceReservations = () => ({
  type: ACTION_TYPES.RESET_INSURANCE_RESERVATIONS
});
