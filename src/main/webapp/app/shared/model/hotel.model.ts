export interface IHotel {
  id?: number;
  name?: string;
  city?: string;
  address?: string;
  type?: string;
}

export const defaultValue: Readonly<IHotel> = {};
