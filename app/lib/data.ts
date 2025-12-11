import postgres from "postgres";
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from "./definitions";
import { formatCurrency } from "./utils";
import { invoiceService } from "@/app/services/invoice";
import { customerService } from "@/app/services/customer";
import { revenueService } from "@/app/services/revenue";
import {
  CustomerPage,
  CustomerPageWithTotal,
  Invoice,
  InvoicePage,
  LatestInvoice,
} from "../types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchInvoices(
  query: string,
  page: number,
  pageSize: number
) {
  let invoicePage = {} as InvoicePage;
  try {
    invoicePage = await invoiceService.getInvoices(query, page, pageSize);
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch invoices.');
  }
  return invoicePage;
}

export async function fetchInvoiceById(id: string) {
  let invoice = {} as Invoice;
  try {
    invoice = await invoiceService.getInvoiceById(id);
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch invoice.');
  }
  return invoice;
}

export async function fetchTotalInvoices(query: string) {
  let total = 0;
  try {
    total = await invoiceService.getTotalInvoices(query);
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch total invoice.');
  }
  return total;
}

export async function fetchTotalPaidInvoices() {
  let total = 0;
  try {
    total = await invoiceService.getTotalPaidInvoices();
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch total paid invoice.');
  }
  return total;
}

export async function fetchTotalPendingInvoices() {
  let total = 0;
  try {
    total = await invoiceService.getTotalPendingInvoices();
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch total pending invoice.');
  }
  return total;
}

export async function fetchRevenue() {
  let revenues = [] as Revenue[];
  try {
    revenues = await revenueService.getRevenues();
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch total revuenues invoice.');
  }
  return revenues;
}

export async function fetchLatestInvoices() {
  let latestInvoices = [] as LatestInvoice[];
  try {
    latestInvoices = await invoiceService.getLatestInvoices();
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch latest invoice.');
  }
  return latestInvoices;
}

export async function fetchCustomers() {
  let customerPage = {} as CustomerPage;
  try {
    customerPage = await customerService.getCustomers();
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch customers');
  }
  return customerPage;
}

export async function fetchCustomersByQuery(
  query: string,
  page: number,
  pageSize: number
) {
  let customerPage = {} as CustomerPage;
  try {
    customerPage = await customerService.getCustomersByQuery(
      query,
      page,
      pageSize
    );
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch customers');
  }
  return customerPage;
}

export async function fetchTotalCustomers(query: string) {
  let total = 0;
  try {
    total = await customerService.getTotalCustomers(query);
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch customers');
  }
  return total;
}

export async function fetchCustomersWithTotals(
  query: string,
  page: number,
  pageSize: number
) {
  let customersPage = {} as CustomerPageWithTotal;
  try {
    customersPage = await customerService.getCustomersWithTotals(
      query,
      page,
      pageSize
    );
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to fetch customers');
  }
  return customersPage;
}
