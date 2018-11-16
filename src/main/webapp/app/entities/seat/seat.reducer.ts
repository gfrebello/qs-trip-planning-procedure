import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISeat, defaultValue } from 'app/shared/model/seat.model';

export const ACTION_TYPES = {
  FETCH_SEAT_LIST: 'seat/FETCH_SEAT_LIST',
  FETCH_SEAT: 'seat/FETCH_SEAT',
  CREATE_SEAT: 'seat/CREATE_SEAT',
  UPDATE_SEAT: 'seat/UPDATE_SEAT',
  DELETE_SEAT: 'seat/DELETE_SEAT',
  RESET: 'seat/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISeat>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SeatState = Readonly<typeof initialState>;

// Reducer

export default (state: SeatState = initialState, action): SeatState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SEAT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SEAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SEAT):
    case REQUEST(ACTION_TYPES.UPDATE_SEAT):
    case REQUEST(ACTION_TYPES.DELETE_SEAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SEAT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SEAT):
    case FAILURE(ACTION_TYPES.CREATE_SEAT):
    case FAILURE(ACTION_TYPES.UPDATE_SEAT):
    case FAILURE(ACTION_TYPES.DELETE_SEAT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEAT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEAT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SEAT):
    case SUCCESS(ACTION_TYPES.UPDATE_SEAT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SEAT):
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

const apiUrl = 'api/seats';

// Actions

export const getEntities: ICrudGetAllAction<ISeat> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SEAT_LIST,
  payload: axios.get<ISeat>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISeat> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SEAT,
    payload: axios.get<ISeat>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISeat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SEAT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISeat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SEAT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISeat> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SEAT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
