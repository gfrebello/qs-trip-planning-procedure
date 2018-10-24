import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChosenAttraction, defaultValue } from 'app/shared/model/chosen-attraction.model';

export const ACTION_TYPES = {
  FETCH_CHOSENATTRACTION_LIST: 'chosenAttraction/FETCH_CHOSENATTRACTION_LIST',
  FETCH_CHOSENATTRACTION: 'chosenAttraction/FETCH_CHOSENATTRACTION',
  CREATE_CHOSENATTRACTION: 'chosenAttraction/CREATE_CHOSENATTRACTION',
  UPDATE_CHOSENATTRACTION: 'chosenAttraction/UPDATE_CHOSENATTRACTION',
  DELETE_CHOSENATTRACTION: 'chosenAttraction/DELETE_CHOSENATTRACTION',
  RESET: 'chosenAttraction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChosenAttraction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ChosenAttractionState = Readonly<typeof initialState>;

// Reducer

export default (state: ChosenAttractionState = initialState, action): ChosenAttractionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHOSENATTRACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHOSENATTRACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHOSENATTRACTION):
    case REQUEST(ACTION_TYPES.UPDATE_CHOSENATTRACTION):
    case REQUEST(ACTION_TYPES.DELETE_CHOSENATTRACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHOSENATTRACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHOSENATTRACTION):
    case FAILURE(ACTION_TYPES.CREATE_CHOSENATTRACTION):
    case FAILURE(ACTION_TYPES.UPDATE_CHOSENATTRACTION):
    case FAILURE(ACTION_TYPES.DELETE_CHOSENATTRACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHOSENATTRACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHOSENATTRACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHOSENATTRACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_CHOSENATTRACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHOSENATTRACTION):
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

const apiUrl = 'api/chosen-attractions';

// Actions

export const getEntities: ICrudGetAllAction<IChosenAttraction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHOSENATTRACTION_LIST,
  payload: axios.get<IChosenAttraction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IChosenAttraction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHOSENATTRACTION,
    payload: axios.get<IChosenAttraction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChosenAttraction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHOSENATTRACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChosenAttraction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHOSENATTRACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChosenAttraction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHOSENATTRACTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
