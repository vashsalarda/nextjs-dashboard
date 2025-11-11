export interface Customer {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

export interface Invoice {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export interface Revenue {
  month: string;
  revenue: number;
};

export interface LatestInvoice {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
  amount: string;
};

