export type StoreResponse = {
  store_id: number;
  name: string;
  address?: string;
  chart: { expense: Category[]; income: Category[] };
};

export type Category = {
  category: string;
  cost: number;
};

export type StoreRequestParams = {
  name: string;
  address?: string;
};
