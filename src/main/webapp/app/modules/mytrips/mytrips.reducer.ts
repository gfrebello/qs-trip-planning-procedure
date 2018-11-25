import axios from 'axios';
import { ICrudGetAllAction, ICrudGetFlightReservationByTrip } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITrip, defaultValue } from 'app/shared/model/trip.model';
import { IFlightReservation } from 'app/shared/model/flight-reservation.model';
import { ISeat } from 'app/shared/model/seat.model';
import { IHotelReservation } from 'app/shared/model/hotel-reservation.model';
import { IHotelRoom } from 'app/shared/model/hotel-room.model';

export const ACTION_TYPES = {
  FETCH_TRIP_LIST: 'myTrips/FETCH_TRIP_LIST',
  FETCH_FLIGHT_RESERVATIONS_LIST: 'myTrips/FETCH_FLIGHT_RESERVATIONS_LIST',
  FETCH_HOTEL_RESERVATIONS_LIST: 'myTrips/FETCH_HOTEL_RESERVATIONS_LIST',
  FETCH_FLIGHT_RESERVATIONS_FROM_TRIP: 'myTrips/FETCH_FLIGHT_RESERVATIONS_FROM_TRIP',
  FETCH_SEAT_LIST: 'myTrips/FETCH_SEAT_LIST',
  FETCH_HOTEL_ROOM_LIST: 'myTrips/FETCH_HOTEL_ROOM_LIST',
  RESET: 'mytrips/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  trips: [] as ReadonlyArray<ITrip>,
  flightReservations: [] as ReadonlyArray<IFlightReservation>,
  hotelReservations: [] as ReadonlyArray<IHotelReservation>,
  seatList: [] as ReadonlyArray<ISeat>,
  roomsList: [] as ReadonlyArray<IHotelRoom>,
  updating: false,
  updateSuccess: false
};

export type MyTripsState = Readonly<typeof initialState>;

// Reducer

export default (state: MyTripsState = initialState, action): MyTripsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRIP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FLIGHT_RESERVATIONS_FROM_TRIP):
    case REQUEST(ACTION_TYPES.FETCH_HOTEL_RESERVATIONS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FLIGHT_RESERVATIONS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SEAT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HOTEL_ROOM_LIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRIP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FLIGHT_RESERVATIONS_FROM_TRIP):
    case FAILURE(ACTION_TYPES.FETCH_HOTEL_RESERVATIONS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FLIGHT_RESERVATIONS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SEAT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HOTEL_ROOM_LIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRIP_LIST):
      return {
        ...state,
        loading: false,
        trips: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLIGHT_RESERVATIONS_FROM_TRIP):
    case SUCCESS(ACTION_TYPES.FETCH_FLIGHT_RESERVATIONS_LIST):
      return {
        ...state,
        loading: false,
        flightReservations: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOTEL_RESERVATIONS_LIST):
      return {
        ...state,
        loading: false,
        hotelReservations: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEAT_LIST):
      return {
        ...state,
        loading: false,
        seatList: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOTEL_ROOM_LIST):
      return {
        ...state,
        loading: false,
        roomsList: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/trips';

// Actions

export const getTrips: ICrudGetAllAction<ITrip> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRIP_LIST,
  payload: axios.get<ITrip>(`api/trips?cacheBuster=${new Date().getTime()}`)
});

export const getFlightReservationsFromTrip: ICrudGetFlightReservationByTrip<IFlightReservation> = (tripId, page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FLIGHT_RESERVATIONS_FROM_TRIP,
  payload: axios.get<IFlightReservation>(`api/flight-reservations/trip/${tripId}`)
});

export const getFlightReservations: ICrudGetAllAction<IFlightReservation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FLIGHT_RESERVATIONS_LIST,
  payload: axios.get<IFlightReservation>(`api/flight-reservations`)
});

export const getHotelReservations: ICrudGetAllAction<IHotelReservation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HOTEL_RESERVATIONS_LIST,
  payload: axios.get<IHotelReservation>(`api/hotel-reservations`)
});

export const getSeats: ICrudGetAllAction<ISeat> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SEAT_LIST,
  payload: axios.get<ISeat>(`api/seats`)
});

export const getHotelRooms: ICrudGetAllAction<IHotelRoom> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HOTEL_ROOM_LIST,
  payload: axios.get<ISeat>(`api/hotel-rooms`)
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
