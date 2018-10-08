export interface IFlightReservation {
  id?: number;
  reservationId?: string;
  numberOfPeople?: number;
  customerClass?: string;
}

export const defaultValue: Readonly<IFlightReservation> = {};
