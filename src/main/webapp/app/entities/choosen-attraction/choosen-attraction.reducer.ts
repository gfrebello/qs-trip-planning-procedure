import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChoosenAttraction, defaultValue } from 'app/shared/model/choosen-attraction.model';

export const ACTION_TYPES = {
  FETCH_CHOOSENATTRACTION_LIST: 'choosenAttraction/FETCH_CHOOSENATTRACTION_LIST',
  FETCH_CHOOSENATTRACTION: 'choosenAttraction/FETCH_CHOOSENATTRACTION',
  CREATE_CHOOSENATTRACTION: 'choosenAttraction/CREATE_CHOOSENATTRACTION',
  UPDATE_CHOOSENATTRACTION: 'choosenAttraction/UPDATE_CHOOSENATTRACTION',
  DELETE_CHOOSENATTRACTION: 'choosenAttraction/DELETE_CHOOSENATTRACTION',
  RESET: 'choosenAttraction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChoosenAttraction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ChoosenAttractionState = Readonly<typeof initialState>;

// Reducer

export default (state: ChoosenAttractionState = initialState, action): ChoosenAttractionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHOOSENATTRACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHOOSENATTRACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHOOSENATTRACTION):
    case REQUEST(ACTION_TYPES.UPDATE_CHOOSENATTRACTION):
    case REQUEST(ACTION_TYPES.DELETE_CHOOSENATTRACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHOOSENATTRACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHOOSENATTRACTION):
    case FAILURE(ACTION_TYPES.CREATE_CHOOSENATTRACTION):
    case FAILURE(ACTION_TYPES.UPDATE_CHOOSENATTRACTION):
    case FAILURE(ACTION_TYPES.DELETE_CHOOSENATTRACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHOOSENATTRACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHOOSENATTRACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHOOSENATTRACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_CHOOSENATTRACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHOOSENATTRACTION):
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

const apiUrl = 'api/choosen-attractions';

// Actions

export const getEntities: ICrudGetAllAction<IChoosenAttraction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHOOSENATTRACTION_LIST,
  payload: axios.get<IChoosenAttraction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IChoosenAttraction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHOOSENATTRACTION,
    payload: axios.get<IChoosenAttraction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChoosenAttraction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHOOSENATTRACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChoosenAttraction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHOOSENATTRACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChoosenAttraction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHOOSENATTRACTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
