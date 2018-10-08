import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaycheck, defaultValue } from 'app/shared/model/paycheck.model';

export const ACTION_TYPES = {
  FETCH_PAYCHECK_LIST: 'paycheck/FETCH_PAYCHECK_LIST',
  FETCH_PAYCHECK: 'paycheck/FETCH_PAYCHECK',
  CREATE_PAYCHECK: 'paycheck/CREATE_PAYCHECK',
  UPDATE_PAYCHECK: 'paycheck/UPDATE_PAYCHECK',
  DELETE_PAYCHECK: 'paycheck/DELETE_PAYCHECK',
  RESET: 'paycheck/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaycheck>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PaycheckState = Readonly<typeof initialState>;

// Reducer

export default (state: PaycheckState = initialState, action): PaycheckState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYCHECK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAYCHECK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYCHECK):
    case REQUEST(ACTION_TYPES.UPDATE_PAYCHECK):
    case REQUEST(ACTION_TYPES.DELETE_PAYCHECK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PAYCHECK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAYCHECK):
    case FAILURE(ACTION_TYPES.CREATE_PAYCHECK):
    case FAILURE(ACTION_TYPES.UPDATE_PAYCHECK):
    case FAILURE(ACTION_TYPES.DELETE_PAYCHECK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYCHECK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYCHECK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYCHECK):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYCHECK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAYCHECK):
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

const apiUrl = 'api/paychecks';

// Actions

export const getEntities: ICrudGetAllAction<IPaycheck> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAYCHECK_LIST,
  payload: axios.get<IPaycheck>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPaycheck> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYCHECK,
    payload: axios.get<IPaycheck>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPaycheck> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYCHECK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaycheck> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYCHECK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaycheck> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAYCHECK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
