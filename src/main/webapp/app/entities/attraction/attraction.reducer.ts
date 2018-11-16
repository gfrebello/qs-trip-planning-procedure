import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAttraction, defaultValue } from 'app/shared/model/attraction.model';

export const ACTION_TYPES = {
  FETCH_ATTRACTION_LIST: 'attraction/FETCH_ATTRACTION_LIST',
  FETCH_ATTRACTION: 'attraction/FETCH_ATTRACTION',
  CREATE_ATTRACTION: 'attraction/CREATE_ATTRACTION',
  UPDATE_ATTRACTION: 'attraction/UPDATE_ATTRACTION',
  DELETE_ATTRACTION: 'attraction/DELETE_ATTRACTION',
  RESET: 'attraction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAttraction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AttractionState = Readonly<typeof initialState>;

// Reducer

export default (state: AttractionState = initialState, action): AttractionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATTRACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATTRACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATTRACTION):
    case REQUEST(ACTION_TYPES.UPDATE_ATTRACTION):
    case REQUEST(ACTION_TYPES.DELETE_ATTRACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATTRACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATTRACTION):
    case FAILURE(ACTION_TYPES.CREATE_ATTRACTION):
    case FAILURE(ACTION_TYPES.UPDATE_ATTRACTION):
    case FAILURE(ACTION_TYPES.DELETE_ATTRACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATTRACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATTRACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATTRACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_ATTRACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATTRACTION):
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

const apiUrl = 'api/attractions';

// Actions

export const getEntities: ICrudGetAllAction<IAttraction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ATTRACTION_LIST,
  payload: axios.get<IAttraction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAttraction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATTRACTION,
    payload: axios.get<IAttraction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAttraction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATTRACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAttraction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATTRACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAttraction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATTRACTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
