import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPassenger, defaultValue } from 'app/shared/model/passenger.model';

export const ACTION_TYPES = {
  FETCH_PASSENGER_LIST: 'passenger/FETCH_PASSENGER_LIST',
  FETCH_PASSENGER: 'passenger/FETCH_PASSENGER',
  CREATE_PASSENGER: 'passenger/CREATE_PASSENGER',
  UPDATE_PASSENGER: 'passenger/UPDATE_PASSENGER',
  DELETE_PASSENGER: 'passenger/DELETE_PASSENGER',
  RESET: 'passenger/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPassenger>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PassengerState = Readonly<typeof initialState>;

// Reducer

export default (state: PassengerState = initialState, action): PassengerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PASSENGER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PASSENGER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PASSENGER):
    case REQUEST(ACTION_TYPES.UPDATE_PASSENGER):
    case REQUEST(ACTION_TYPES.DELETE_PASSENGER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PASSENGER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PASSENGER):
    case FAILURE(ACTION_TYPES.CREATE_PASSENGER):
    case FAILURE(ACTION_TYPES.UPDATE_PASSENGER):
    case FAILURE(ACTION_TYPES.DELETE_PASSENGER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASSENGER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASSENGER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PASSENGER):
    case SUCCESS(ACTION_TYPES.UPDATE_PASSENGER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PASSENGER):
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

const apiUrl = 'api/passengers';

// Actions

export const getEntities: ICrudGetAllAction<IPassenger> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PASSENGER_LIST,
  payload: axios.get<IPassenger>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPassenger> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PASSENGER,
    payload: axios.get<IPassenger>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPassenger> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PASSENGER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPassenger> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PASSENGER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPassenger> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PASSENGER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
