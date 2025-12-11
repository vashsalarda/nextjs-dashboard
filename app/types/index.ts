export interface Customer {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

export interface CustomerPage {
  page_size: string;
  page_number: string;
  total_rows: number;
  total_pages: string;
  data: Customer[];
};

export interface CustomerPageWithTotal {
  page_size: string;
  page_number: string;
  total_rows: number;
  total_pages: string;
  data: CustomerWithTotal[];
};

export type CustomerWithTotal = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  totalInvoices: number;
  totalPending: number;
  totalPaid: number;
};

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
  customer: Customer;
};

export interface InvoicePage {
  page_size: string;
  page_number: string;
  total_rows: number;
  total_pages: string;
  data: Invoice[];
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

