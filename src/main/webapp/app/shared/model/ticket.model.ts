export interface ITicket {
  id?: number;
  type?: string;
  reservationId?: string;
}

export const defaultValue: Readonly<ITicket> = {};
