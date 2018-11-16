import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { cleanEntity } from 'app/shared/util/entity-utils';
import axios from 'axios';

export const ACTION_TYPES = {
  CREATE_TRIP: 'confirmation/CREATE_TRIP',
  CREATE_FLIGHTRESERVATION: 'confirmation/CREATE_FLIGHTRESERVATION',
  CREATE_PASSENGERS: 'confirmation/CREATE_PASSENGERS',
  UPDATE_SEATS: 'confirmation/UPDATE_SEATS',
  RESET: 'confirmation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  entity: []
};

export type ReservationsState = Readonly<typeof initialState>;

// Reducer
export default (state: ReservationsState = initialState, action): ReservationsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.CREATE_TRIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.CREATE_TRIP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/trip';

// Actions
export const createTrip = (tripEntity, flightReservationEntities, passengersEntity, seatEntities) => async dispatch => {
  const postResult = axios
    .post(apiUrl, cleanEntity(tripEntity))
    .then(response => {
      console.log('TripCreationResponse', response);
      return axios.post(apiUrl, cleanEntity(flightReservationEntity));
    })
    .then(response => {
      console.log('FlightReservationCreationResponse', response);
      return axios.post(apiUrl, cleanEntity(passengersEntity));
    })
    .then(response => {
      console.log('PassengerEntityCreationResponse', response);
      return axios.put();
    })
    .then(response => {});
  console.log('Post Result', postResult);
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRIP,
    payload: postResult
  });
  return result;
};

export const createEntity: ICrudPutAction<ITrip> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRIP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
