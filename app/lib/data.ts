import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { invoiceService } from "@/app/services/invoice";
import { customerService } from "@/app/services/customer";
import { revenueService } from "@/app/services/revenue";
import { CustomerPage, Invoice, InvoicePage, LatestInvoice } from '../types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchInvoices(query: string, page: number, pageSize: number) {
  let invoicePage = {} as InvoicePage;
  try {
    invoicePage = await invoiceService.getInvoices(query, page, pageSize);
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch invoices.');
  }
  return invoicePage;
}

export async function fetchInvoiceById(id: string) {
  let invoice = {} as Invoice;
  try {
    invoice = await invoiceService.getInvoiceById(id);
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch invoice.');
  }
  return invoice;
}

export async function fetchTotalInvoices(query: string) {
  let total = 0;
  try {
    total = await invoiceService.getTotalInvoices(query);
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch total invoice.');
  }
  return total;
}

export async function fetchTotalPaidInvoices() {
  let total = 0;
  try {
    total = await invoiceService.getTotalPaidInvoices();
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch total paid invoice.');
  }
  return total;
}

export async function fetchTotalPendingInvoices() {
  let total = 0;
  try {
    total = await invoiceService.getTotalPendingInvoices();
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch total pending invoice.');
  }
  return total;
}

export async function fetchRevenue() {
  let revenues = [] as Revenue[];
  try {
    revenues = await revenueService.getRevenues();
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch total revuenues invoice.');
  }
  return revenues;
}

export async function fetchLatestInvoices() {
  let latestInvoices = [] as LatestInvoice[];
  try {
    latestInvoices = await invoiceService.getLatestInvoices();
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch latest invoice.');
  }
  return latestInvoices;
}

export async function fetchCustomers() {
  let customerPage = {} as CustomerPage;
  try {
    customerPage = await customerService.getCustomers();
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch customers');
  }
  return customerPage;
}

export async function fetchTotalCustomers() {
  let total = 0
  try {
    total =  await customerService.getTotalCustomers();
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch customers');
  }
  return total;
}

// export async function fetchCardData() {
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0][0].count ?? '0');
//     const numberOfCustomers = Number(data[1][0].count ?? '0');
//     const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
//     const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

// const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredInvoices(
//   query: string,
//   currentPage: number,
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const invoices = await sql<InvoicesTable[]>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return invoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoices.');
//   }
// }

// export async function fetchInvoicesPages(query: string) {
//   try {
//     const data = await sql`SELECT COUNT(*)
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE
//       customers.name ILIKE ${`%${query}%`} OR
//       customers.email ILIKE ${`%${query}%`} OR
//       invoices.amount::text ILIKE ${`%${query}%`} OR
//       invoices.date::text ILIKE ${`%${query}%`} OR
//       invoices.status ILIKE ${`%${query}%`}
//   `;

//     const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
// }

// export async function fetchInvoiceById(id: string) {
//   try {
//     const data = await sql<InvoiceForm[]>`
//       SELECT
//         invoices.id,
//         invoices.customer_id,
//         invoices.amount,
//         invoices.status
//       FROM invoices
//       WHERE invoices.id = ${id};
//     `;

//     const invoice = data.map((invoice) => ({
//       ...invoice,
//       // Convert amount from cents to dollars
//       amount: invoice.amount / 100,
//     }));

//     return invoice[0];
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoice.');
//   }
// }

// export async function fetchCustomers() {
//   try {
//     const customers = await sql<CustomerField[]>`
//       SELECT
//         id,
//         name
//       FROM customers
//       ORDER BY name ASC
//     `;

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all customers.');
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await sql<CustomersTableType[]>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.totalPending),
//       total_paid: formatCurrency(customer.totalPaid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }
