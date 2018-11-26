export const ACTION_TYPES = {
    SUBMIT_INFO: 'passenger-info/SUBMIT_TRIP',
    REDIRECT_TO_PLANNER: 'passenger-info/REDIRECT_TO_PLANNER',
    RESET_REDIRECT: 'passenger-info/RESET_REDIRECT'
  };

  const initialState = {
    passengerInfo: {
        0: {
            id: 0,
            content: {
                firstName: null,
                lastName: null,
                nationality: null,
                documentType: null,
                documentNumber: null,
                birthDate: null,
                gender: null,
                phoneNumber: null,
                address: null,
                zipcode: null,
                email: null
            }
        },
        1: {
            id: 1,
            content: {
                firstName: null,
                lastName: null,
                nationality: null,
                documentType: null,
                documentNumber: null,
                birthDate: null,
                gender: null,
                phoneNumber: null,
                address: null,
                zipcode: null,
                email: null
            }
        },
        2: {
            id: 1,
            content: {
                firstName: null,
                lastName: null,
                nationality: null,
                documentType: null,
                documentNumber: null,
                birthDate: null,
                gender: null,
                phoneNumber: null,
                address: null,
                zipcode: null,
                email: null
            }
        },
        3: {
            id: 1,
            content: {
                firstName: null,
                lastName: null,
                nationality: null,
                documentType: null,
                documentNumber: null,
                birthDate: null,
                gender: null,
                phoneNumber: null,
                address: null,
                zipcode: null,
                email: null
            }
        }
    },
    redirect: false
  };

  export type PlanState = Readonly<typeof initialState>;

  // Reducer
  export default (state: PlanState = initialState, action): PlanState => {
    switch (action.type) {
      case ACTION_TYPES.SUBMIT_INFO: {
        state.passengerInfo[action.id] = {
          ...state.passengerInfo[action.id],
          ...action.payload
        };
        return {
            ...state
        };
    }
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
export const handleSubmit = (
        id,
        firstName,
        lastName,
        nationality,
        documentType,
        documentNumber,
        birthDate,
        gender,
        phoneNumber,
        address,
        zipcode,
        email) => ({
    type: ACTION_TYPES.SUBMIT_INFO,
    id,
    payload: {
        id,
        content: {
            firstName,
            lastName,
            nationality,
            documentType,
            documentNumber,
            birthDate,
            gender,
            phoneNumber,
            address,
            zipcode,
            email
        }
    },
    meta: {
      successMessage: 'Passenger info successfully registered!'
    }
  });

  export const handleRedirect = () => ({
    type: ACTION_TYPES.REDIRECT_TO_PLANNER
  });

  export const resetRedirect = () => ({
    type: ACTION_TYPES.RESET_REDIRECT
  });
