import api from "@/lib/axios";
import { Invoice, InvoicePage } from "@/app/types";
import { LatestInvoice } from "../lib/definitions";

export const invoiceService = {
  
  getInvoices: async (
    query: string,
    currentPage: number,
  ): Promise<InvoicePage> => {
    const ITEMS_PER_PAGE = 6;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
      console.log("Fetching invoice data...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await api.get<InvoicePage>("/invoices");
      console.log("Data fetch completed.");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      throw error;
    }
  },

  getInvoiceById: async (id: number): Promise<Invoice> => {
    try {
      const response = await api.get<Invoice>(`/invoices/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch invoice ${id}:`, error);
      throw error;
    }
  },

  createInvoice: async (invoice: Omit<Invoice, "id">): Promise<Invoice> => {
    try {
      const response = await api.post<Invoice>("/invoices", invoice);
      return response.data;
    } catch (error) {
      console.error("Failed to create invoice:", error);
      throw error;
    }
  },

  updateInvoice: async (
    id: string,
    invoice: Partial<Invoice>
  ): Promise<Invoice> => {
    try {
      const response = await api.put<Invoice>(`/invoices/${id}`, invoice);
      return response.data;
    } catch (error) {
      console.error(`Failed to update invoice ${id}:`, error);
      throw error;
    }
  },

  deleteInvoice: async (id: number): Promise<void> => {
    try {
      await api.delete(`/invoices/${id}`);
    } catch (error) {
      console.error(`Failed to delete invoice ${id}:`, error);
      throw error;
    }
  },

  getLatestInvoices: async (): Promise<LatestInvoice[]> => {
    try {
      console.log("Fetching latest latest...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await api.get<LatestInvoice[]>("/invoices/latest");
      console.log("Data fetch completed.");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch latest latest:", error);
      throw error;
    }
  },

  getTotalInvoices: async (): Promise<number> => {
    try {
      console.log("Fetching total invoices...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await api.get<number>("/invoices-total");
      console.log("Data fetch completed.");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch total invoices:", error);
      throw error;
    }
  },

  getTotalPaidInvoices: async (): Promise<number> => {
    try {
      console.log("Fetching total invoices...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await api.get<number>("/invoices-total?status=paid");
      console.log("Data fetch completed.");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch total paid invoices:", error);
      throw error;
    }
  },

  getTotalPendingInvoices: async (): Promise<number> => {
    try {
      console.log("Fetching total invoices...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await api.get<number>("/invoices-total?status=pending");
      console.log("Data fetch completed.");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch total pending invoices:", error);
      throw error;
    }
  },
};
