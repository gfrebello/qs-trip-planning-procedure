import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFlightReservation, defaultValue } from 'app/shared/model/flight-reservation.model';

export const ACTION_TYPES = {
  FETCH_FLIGHTRESERVATION_LIST: 'flightReservation/FETCH_FLIGHTRESERVATION_LIST',
  FETCH_FLIGHTRESERVATION: 'flightReservation/FETCH_FLIGHTRESERVATION',
  CREATE_FLIGHTRESERVATION: 'flightReservation/CREATE_FLIGHTRESERVATION',
  UPDATE_FLIGHTRESERVATION: 'flightReservation/UPDATE_FLIGHTRESERVATION',
  DELETE_FLIGHTRESERVATION: 'flightReservation/DELETE_FLIGHTRESERVATION',
  RESET: 'flightReservation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFlightReservation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FlightReservationState = Readonly<typeof initialState>;

// Reducer

export default (state: FlightReservationState = initialState, action): FlightReservationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FLIGHTRESERVATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FLIGHTRESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FLIGHTRESERVATION):
    case REQUEST(ACTION_TYPES.UPDATE_FLIGHTRESERVATION):
    case REQUEST(ACTION_TYPES.DELETE_FLIGHTRESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FLIGHTRESERVATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FLIGHTRESERVATION):
    case FAILURE(ACTION_TYPES.CREATE_FLIGHTRESERVATION):
    case FAILURE(ACTION_TYPES.UPDATE_FLIGHTRESERVATION):
    case FAILURE(ACTION_TYPES.DELETE_FLIGHTRESERVATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLIGHTRESERVATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLIGHTRESERVATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FLIGHTRESERVATION):
    case SUCCESS(ACTION_TYPES.UPDATE_FLIGHTRESERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FLIGHTRESERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/flight-reservations';

// Actions

export const getEntities: ICrudGetAllAction<IFlightReservation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FLIGHTRESERVATION_LIST,
  payload: axios.get<IFlightReservation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFlightReservation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FLIGHTRESERVATION,
    payload: axios.get<IFlightReservation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFlightReservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FLIGHTRESERVATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFlightReservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FLIGHTRESERVATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFlightReservation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FLIGHTRESERVATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
