import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICheckPayment, defaultValue } from 'app/shared/model/check-payment.model';

export const ACTION_TYPES = {
  FETCH_CHECKPAYMENT_LIST: 'checkPayment/FETCH_CHECKPAYMENT_LIST',
  FETCH_CHECKPAYMENT: 'checkPayment/FETCH_CHECKPAYMENT',
  CREATE_CHECKPAYMENT: 'checkPayment/CREATE_CHECKPAYMENT',
  UPDATE_CHECKPAYMENT: 'checkPayment/UPDATE_CHECKPAYMENT',
  DELETE_CHECKPAYMENT: 'checkPayment/DELETE_CHECKPAYMENT',
  RESET: 'checkPayment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICheckPayment>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CheckPaymentState = Readonly<typeof initialState>;

// Reducer

export default (state: CheckPaymentState = initialState, action): CheckPaymentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHECKPAYMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHECKPAYMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHECKPAYMENT):
    case REQUEST(ACTION_TYPES.UPDATE_CHECKPAYMENT):
    case REQUEST(ACTION_TYPES.DELETE_CHECKPAYMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHECKPAYMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHECKPAYMENT):
    case FAILURE(ACTION_TYPES.CREATE_CHECKPAYMENT):
    case FAILURE(ACTION_TYPES.UPDATE_CHECKPAYMENT):
    case FAILURE(ACTION_TYPES.DELETE_CHECKPAYMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHECKPAYMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHECKPAYMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHECKPAYMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_CHECKPAYMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHECKPAYMENT):
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

const apiUrl = 'api/check-payments';

// Actions

export const getEntities: ICrudGetAllAction<ICheckPayment> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHECKPAYMENT_LIST,
  payload: axios.get<ICheckPayment>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICheckPayment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHECKPAYMENT,
    payload: axios.get<ICheckPayment>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICheckPayment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHECKPAYMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICheckPayment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHECKPAYMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICheckPayment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHECKPAYMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
