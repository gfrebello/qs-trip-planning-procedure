export interface IAttraction {
  id?: number;
  name?: string;
  type?: string;
  city?: string;
  price?: number;
}

export const defaultValue: Readonly<IAttraction> = {};
