import axios from 'axios';
import {
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
  // ICrudGetFlightByDateOriginDestination
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFlight, defaultValue } from 'app/shared/model/flight.model';

export const ACTION_TYPES = {
  FETCH_FLIGHT_LIST: 'flight/FETCH_FLIGHT_LIST',
  FETCH_FLIGHT: 'flight/FETCH_FLIGHT',
  CREATE_FLIGHT: 'flight/CREATE_FLIGHT',
  UPDATE_FLIGHT: 'flight/UPDATE_FLIGHT',
  DELETE_FLIGHT: 'flight/DELETE_FLIGHT',
  RESET: 'flight/RESET',
  FETCH_FLIGHTS_BY_DATE_ORIGIN_DESTINATION: 'flight/FETCH_FLIGHTS_BY_DATE_ORIGIN_DESTINATION'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFlight>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FlightState = Readonly<typeof initialState>;

// Reducer

export default (state: FlightState = initialState, action): FlightState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FLIGHT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FLIGHT):
    case REQUEST(ACTION_TYPES.FETCH_FLIGHTS_BY_DATE_ORIGIN_DESTINATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FLIGHT):
    case REQUEST(ACTION_TYPES.UPDATE_FLIGHT):
    case REQUEST(ACTION_TYPES.DELETE_FLIGHT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FLIGHT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FLIGHT):
    case FAILURE(ACTION_TYPES.FETCH_FLIGHTS_BY_DATE_ORIGIN_DESTINATION):
    case FAILURE(ACTION_TYPES.CREATE_FLIGHT):
    case FAILURE(ACTION_TYPES.UPDATE_FLIGHT):
    case FAILURE(ACTION_TYPES.DELETE_FLIGHT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLIGHT_LIST):
    case SUCCESS(ACTION_TYPES.FETCH_FLIGHTS_BY_DATE_ORIGIN_DESTINATION):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLIGHT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FLIGHT):
    case SUCCESS(ACTION_TYPES.UPDATE_FLIGHT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FLIGHT):
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

const apiUrl = 'api/flights';

// Actions

export const getEntities: ICrudGetAllAction<IFlight> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FLIGHT_LIST,
  payload: axios.get<IFlight>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFlight> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FLIGHT,
    payload: axios.get<IFlight>(requestUrl)
  };
};

export const getEntitiesByDateOriginDestination: ICrudGetFlightByDateOriginDestination<IFlight> = (
  departureDate,
  origin,
  destination,
  page,
  size,
  sort
) => {
  const requestUrl = `${apiUrl}/${departureDate}/${origin}/${destination}`;
  return {
    type: ACTION_TYPES.FETCH_FLIGHTS_BY_DATE_ORIGIN_DESTINATION,
    payload: axios.get<IFlight>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFlight> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FLIGHT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFlight> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FLIGHT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFlight> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FLIGHT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
