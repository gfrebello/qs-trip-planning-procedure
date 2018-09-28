export const ACTION_TYPES = {
  SUBMIT_TRIP: 'home/SUBMIT_TRIP',
  REDIRECT_TO_PLANNER: 'home/REDIRECT_TO_PLANNER',
  RESET_REDIRECT: 'home/RESET_REDIRECT'
};

const initialState = {
  origin: null,
  destination: null,
  departDate: null,
  returnDate: null,
  nPassengers: null,
  redirect: false
};

export type TripState = Readonly<typeof initialState>;

// Reducer
export default (state: TripState = initialState, action): TripState => {
  switch (action.type) {
    case ACTION_TYPES.SUBMIT_TRIP:
      return {
        ...action.payload
      };
    case ACTION_TYPES.REDIRECT_TO_PLANNER:
      return {
        ...state,
        redirect: true
      };
    case ACTION_TYPES.RESET_REDIRECT:
      return {
        ...state,
        redirect: false
      };
    default:
      return state;
  }
};

// Actions
export const handleSubmit = (origin, destination, departDate, returnDate, nPassengers) => ({
  type: ACTION_TYPES.SUBMIT_TRIP,
  payload: { origin, destination, departDate, returnDate, nPassengers },
  meta: {
    successMessage: 'Trip successfully registered!'
  }
});

export const handleRedirect = () => ({
  type: ACTION_TYPES.REDIRECT_TO_PLANNER
});

export const resetRedirect = () => ({
  type: ACTION_TYPES.RESET_REDIRECT
});
