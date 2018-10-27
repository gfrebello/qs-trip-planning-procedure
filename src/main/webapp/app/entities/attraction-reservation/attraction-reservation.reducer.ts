import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAttractionReservation, defaultValue } from 'app/shared/model/attraction-reservation.model';

export const ACTION_TYPES = {
  FETCH_ATTRACTIONRESERVATION_LIST: 'attractionReservation/FETCH_ATTRACTIONRESERVATION_LIST',
  FETCH_ATTRACTIONRESERVATION: 'attractionReservation/FETCH_ATTRACTIONRESERVATION',
  CREATE_ATTRACTIONRESERVATION: 'attractionReservation/CREATE_ATTRACTIONRESERVATION',
  UPDATE_ATTRACTIONRESERVATION: 'attractionReservation/UPDATE_ATTRACTIONRESERVATION',
  DELETE_ATTRACTIONRESERVATION: 'attractionReservation/DELETE_ATTRACTIONRESERVATION',
  RESET: 'attractionReservation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAttractionReservation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AttractionReservationState = Readonly<typeof initialState>;

// Reducer

export default (state: AttractionReservationState = initialState, action): AttractionReservationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATTRACTIONRESERVATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATTRACTIONRESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATTRACTIONRESERVATION):
    case REQUEST(ACTION_TYPES.UPDATE_ATTRACTIONRESERVATION):
    case REQUEST(ACTION_TYPES.DELETE_ATTRACTIONRESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATTRACTIONRESERVATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATTRACTIONRESERVATION):
    case FAILURE(ACTION_TYPES.CREATE_ATTRACTIONRESERVATION):
    case FAILURE(ACTION_TYPES.UPDATE_ATTRACTIONRESERVATION):
    case FAILURE(ACTION_TYPES.DELETE_ATTRACTIONRESERVATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATTRACTIONRESERVATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATTRACTIONRESERVATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATTRACTIONRESERVATION):
    case SUCCESS(ACTION_TYPES.UPDATE_ATTRACTIONRESERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATTRACTIONRESERVATION):
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

const apiUrl = 'api/attraction-reservations';

// Actions

export const getEntities: ICrudGetAllAction<IAttractionReservation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ATTRACTIONRESERVATION_LIST,
  payload: axios.get<IAttractionReservation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAttractionReservation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATTRACTIONRESERVATION,
    payload: axios.get<IAttractionReservation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAttractionReservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATTRACTIONRESERVATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAttractionReservation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATTRACTIONRESERVATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAttractionReservation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATTRACTIONRESERVATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
