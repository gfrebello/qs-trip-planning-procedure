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

export type ConfirmationState = Readonly<typeof initialState>;

// Reducer
export default (state: ConfirmationState = initialState, action): ConfirmationState => {
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

// Actions
export const createTrip = (tripEntity, flightReservationEntities) => async dispatch => {
  axios
    .post('api/trips', cleanEntity(tripEntity))
    .then(tripResponse => {
      const tripID = tripResponse.data.id;
      for (const fResEnt of flightReservationEntities) {
        const fRes = fResEnt.flightReservation;
        const fResEntity = {
          ...fRes,
          trip: { id: tripID }
        };
        axios.post('api/flight-reservations', cleanEntity(fResEntity)).then(flightReservationResponse => {
          const flightResID = flightReservationResponse.data.id;
          for (const seatEnt of fResEnt.reservationSeats) {
            const seatEntity = {
              ...seatEnt,
              flightReservation: { id: flightResID }
            };
            console.log(seatEntity);
            axios.put('api/seats', cleanEntity(seatEntity));
          }
        });
      }
    })
    .then(response => ({
      type: ACTION_TYPES.CREATE_TRIP,
      payload: response
    }));
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
