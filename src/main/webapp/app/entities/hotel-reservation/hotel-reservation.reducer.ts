import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHotelReservation, defaultValue } from 'app/shared/model/hotel-reservation.model';

export const ACTION_TYPES = {
  FETCH_HOTELRESERVATION_LIST: 'hotelReservation/FETCH_HOTELRESERVATION_LIST',
  FETCH_HOTELRESERVATION: 'hotelReservation/FETCH_HOTELRESERVATION',
  CREATE_HOTELRESERVATION: 'hotelReservation/CREATE_HOTELRESERVATION',
  UPDATE_HOTELRESERVATION: 'hotelReservation/UPDATE_HOTELRESERVATION',
  DELETE_HOTELRESERVATION: 'hotelReservation/DELETE_HOTELRESERVATION',
  RESET: 'hotelReservation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHotelReservation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type HotelReservationState = Readonly<typeof initialState>;

// Reducer

export default (state: HotelReservationState = initialState, action): HotelReservationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HOTELRESERVATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HOTELRESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HOTELRESERVATION):
    case REQUEST(ACTION_TYPES.UPDATE_HOTELRESERVATION):
    case REQUEST(ACTION_TYPES.DELETE_HOTELRESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HOTELRESERVATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HOTELRESERVATION):
    case FAILURE(ACTION_TYPES.CREATE_HOTELRESERVATION):
    case FAILURE(ACTION_TYPES.UPDATE_HOTELRESERVATION):
    case FAILURE(ACTION_TYPES.DELETE_HOTELRESERVATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOTELRESERVATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOTELRESERVATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HOTELRESERVATION):
    case SUCCESS(ACTION_TYPES.UPDATE_HOTELRESERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HOTELRESERVATION):
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

const apiUrl = 'api/hotel-reservations';

// Actions

export const getEntities: ICrudGetAllAction<IHotelReservation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HOTELRESERVATION_LIST,
  payload: axios.get<IHotelReservation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IHotelReservation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HOTELRESERVATION,
    payload: axios.get<IHotelReservation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHotelReservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HOTELRESERVATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHotelReservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HOTELRESERVATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHotelReservation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HOTELRESERVATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
