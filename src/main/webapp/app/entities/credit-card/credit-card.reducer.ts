import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICreditCard, defaultValue } from 'app/shared/model/credit-card.model';

export const ACTION_TYPES = {
  FETCH_CREDITCARD_LIST: 'creditCard/FETCH_CREDITCARD_LIST',
  FETCH_CREDITCARD: 'creditCard/FETCH_CREDITCARD',
  CREATE_CREDITCARD: 'creditCard/CREATE_CREDITCARD',
  UPDATE_CREDITCARD: 'creditCard/UPDATE_CREDITCARD',
  DELETE_CREDITCARD: 'creditCard/DELETE_CREDITCARD',
  RESET: 'creditCard/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICreditCard>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CreditCardState = Readonly<typeof initialState>;

// Reducer

export default (state: CreditCardState = initialState, action): CreditCardState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CREDITCARD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CREDITCARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CREDITCARD):
    case REQUEST(ACTION_TYPES.UPDATE_CREDITCARD):
    case REQUEST(ACTION_TYPES.DELETE_CREDITCARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CREDITCARD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CREDITCARD):
    case FAILURE(ACTION_TYPES.CREATE_CREDITCARD):
    case FAILURE(ACTION_TYPES.UPDATE_CREDITCARD):
    case FAILURE(ACTION_TYPES.DELETE_CREDITCARD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CREDITCARD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CREDITCARD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CREDITCARD):
    case SUCCESS(ACTION_TYPES.UPDATE_CREDITCARD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CREDITCARD):
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

const apiUrl = 'api/credit-cards';

// Actions

export const getEntities: ICrudGetAllAction<ICreditCard> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CREDITCARD_LIST,
  payload: axios.get<ICreditCard>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICreditCard> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CREDITCARD,
    payload: axios.get<ICreditCard>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICreditCard> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CREDITCARD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICreditCard> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CREDITCARD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICreditCard> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CREDITCARD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
