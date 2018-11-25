export const ACTION_TYPES = {
  RESET_FLIGHT_RESERVATIONS: 'reservations/RESET_FLIGHT_RESERVATIONS',
  RESET_HOTEL_RESERVATIONS: 'reservations/RESET_HOTEL_RESERVATIONS',
  RESET_ATTRACTION_RESERVATIONS: 'reservations/RESET_ATTRACTION_RESERVATIONS',
  RESET_CAR_RENTAL_RESERVATIONS: 'reservations/RESET_CAR_RENTAL_RESERVATIONS',
  RESET_INSURANCE_RESERVATIONS: 'reservations/RESET_INSURANCE_RESERVATIONS',
  ADD_SELECTED_FLIGHT: 'reservations/ADD_SELECTED_FLIGHT',
  ADD_SELECTED_HOTEL: 'reservations/ADD_SELECTED_HOTEL',
  UPDATE_PASSENGERS_EXECUTIVE: 'reservations/UPDATE_PASSENGERS_EXECUTIVE',
  UPDATE_PASSENGERS_ECONOMIC: 'reservations/UPDATE_PASSENGERS_ECONOMIC',
  UPDATE_R_SELECTED: 'reservations/UPDATE_R_SELECTED',
  UPDATE_H_SELECTED: 'reservations/UPDATE_H_SELECTED'
};

const initialState = {
  // reservedFlights: [] as ReadonlyArray<IFlightReservation>,
  reservedFlights: [],
  // reservedHotels: [] as ReadonlyArray<IHotelReservation>,
  reservedHotels: [],
  // chosenAttractions: [] as ReadonlyArray<IChosenAttraction>,
  chosenAttractions: ['test'],
  // rentedCars: [] as ReadonlyArray<ICarRental>,
  rentedCars: ['test'],
  // insurances: [] as ReadonlyArray<IInsurance>
  boughtInsurances: ['test'],
  nPassengersEconomic: 0,
  nPassengersExecutive: 0,
  rSelected: -1,
  hSelected: -1
};

export type ReservationsState = Readonly<typeof initialState>;

// Reducer
export default (state: ReservationsState = initialState, action): ReservationsState => {
  switch (action.type) {
    case ACTION_TYPES.RESET_FLIGHT_RESERVATIONS:
      return {
        ...state,
        reservedFlights: []
      };
    case ACTION_TYPES.RESET_HOTEL_RESERVATIONS:
      return {
        ...state,
        reservedHotels: []
      };
    case ACTION_TYPES.RESET_ATTRACTION_RESERVATIONS:
      return {
        ...state,
        chosenAttractions: []
      };
    case ACTION_TYPES.RESET_CAR_RENTAL_RESERVATIONS:
      return {
        ...state,
        rentedCars: []
      };
    case ACTION_TYPES.RESET_INSURANCE_RESERVATIONS:
      return {
        ...state,
        boughtInsurances: []
      };
    case ACTION_TYPES.ADD_SELECTED_FLIGHT:
      return {
        ...state,
        reservedFlights: [
          ...state.reservedFlights,
          { flight: action.payload.selectedFlight, reservedSeats: action.payload.reservedSeats, price: action.payload.price }
        ]
      };
    case ACTION_TYPES.ADD_SELECTED_HOTEL:
      return {
        ...state,
        reservedHotels: [
          ...state.reservedHotels,
          {
            hotel: action.payload.selectedHotel,
            reservedRooms: action.payload.reservedRooms,
            price: action.payload.price,
            checkinDate: action.payload.checkinDate,
            checkoutDate: action.payload.checkoutDate
          }
        ]
      };
    case ACTION_TYPES.UPDATE_PASSENGERS_ECONOMIC:
      return {
        ...state,
        nPassengersEconomic: action.payload.nPassengersEconomic
      };
    case ACTION_TYPES.UPDATE_PASSENGERS_EXECUTIVE:
      return {
        ...state,
        nPassengersExecutive: action.payload.nPassengersExecutive
      };
    case ACTION_TYPES.UPDATE_R_SELECTED:
      return {
        ...state,
        rSelected: action.payload.rSelected
      };
    case ACTION_TYPES.UPDATE_H_SELECTED:
      return {
        ...state,
        hSelected: action.payload.hSelected
      };
    default:
      return state;
  }
};

// Actions
export const resetFlightReservations = () => ({
  type: ACTION_TYPES.RESET_FLIGHT_RESERVATIONS
});

export const resetHotelReservations = () => ({
  type: ACTION_TYPES.RESET_HOTEL_RESERVATIONS
});

export const resetAttractionReservations = () => ({
  type: ACTION_TYPES.RESET_ATTRACTION_RESERVATIONS
});

export const resetCarRentalReservations = () => ({
  type: ACTION_TYPES.RESET_CAR_RENTAL_RESERVATIONS
});

export const resetInsuranceReservations = () => ({
  type: ACTION_TYPES.RESET_INSURANCE_RESERVATIONS
});

export const addSelectedFlight = (selectedFlight, reservedSeats, price) => ({
  type: ACTION_TYPES.ADD_SELECTED_FLIGHT,
  payload: { selectedFlight, reservedSeats, price }
});

export const addSelectedHotel = (selectedHotel, reservedRooms, price, checkinDate, checkoutDate) => ({
  type: ACTION_TYPES.ADD_SELECTED_HOTEL,
  payload: { selectedHotel, reservedRooms, price, checkinDate, checkoutDate }
});

export const updatePassengersEconomic = nPassengersEconomic => ({
  type: ACTION_TYPES.UPDATE_PASSENGERS_ECONOMIC,
  payload: { nPassengersEconomic }
});

export const updatePassengersExecutive = nPassengersExecutive => ({
  type: ACTION_TYPES.UPDATE_PASSENGERS_EXECUTIVE,
  payload: { nPassengersExecutive }
});

export const updateRSelected = rSelected => ({
  type: ACTION_TYPES.UPDATE_R_SELECTED,
  payload: { rSelected }
});

export const updateHSelected = hSelected => ({
  type: ACTION_TYPES.UPDATE_H_SELECTED,
  payload: { hSelected }
});
