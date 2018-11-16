import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICarRental, defaultValue } from 'app/shared/model/car-rental.model';

export const ACTION_TYPES = {
  FETCH_CARRENTAL_LIST: 'carRental/FETCH_CARRENTAL_LIST',
  FETCH_CARRENTAL: 'carRental/FETCH_CARRENTAL',
  CREATE_CARRENTAL: 'carRental/CREATE_CARRENTAL',
  UPDATE_CARRENTAL: 'carRental/UPDATE_CARRENTAL',
  DELETE_CARRENTAL: 'carRental/DELETE_CARRENTAL',
  RESET: 'carRental/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICarRental>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CarRentalState = Readonly<typeof initialState>;

// Reducer

export default (state: CarRentalState = initialState, action): CarRentalState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CARRENTAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CARRENTAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CARRENTAL):
    case REQUEST(ACTION_TYPES.UPDATE_CARRENTAL):
    case REQUEST(ACTION_TYPES.DELETE_CARRENTAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CARRENTAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CARRENTAL):
    case FAILURE(ACTION_TYPES.CREATE_CARRENTAL):
    case FAILURE(ACTION_TYPES.UPDATE_CARRENTAL):
    case FAILURE(ACTION_TYPES.DELETE_CARRENTAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRENTAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRENTAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CARRENTAL):
    case SUCCESS(ACTION_TYPES.UPDATE_CARRENTAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CARRENTAL):
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

const apiUrl = 'api/car-rentals';

// Actions

export const getEntities: ICrudGetAllAction<ICarRental> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CARRENTAL_LIST,
  payload: axios.get<ICarRental>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICarRental> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CARRENTAL,
    payload: axios.get<ICarRental>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICarRental> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CARRENTAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICarRental> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CARRENTAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICarRental> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CARRENTAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
