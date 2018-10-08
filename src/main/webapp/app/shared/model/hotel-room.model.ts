export interface IHotelRoom {
  id?: number;
  numberOfPeople?: number;
  price?: number;
  available?: boolean;
  type?: string;
}

export const defaultValue: Readonly<IHotelRoom> = {
  available: false
};
