import api from "@/lib/axios";
import { Invoice, InvoicePage } from "@/app/types";
import { LatestInvoice } from "../lib/definitions";

export const invoiceService = {
  
  getInvoices: async (
    query: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<InvoicePage> => {
    const params = new URLSearchParams();
    if (query) params.append("keyword", query);
    if (pageNumber) params.append("page", pageNumber.toString());
    if (pageSize) params.append("size", pageSize.toString());
    
    try {
      const url = `/invoices${params.toString() ? `?${params.toString()}` : ""}`;
      console.log("Fetching invoice data...");
      const response = await api.get<InvoicePage>(url);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      throw error;
    }
  },

  getInvoiceById: async (id: string): Promise<Invoice> => {
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
      console.log("Fetching latest invoices...");
      const response = await api.get<LatestInvoice[]>("/invoices/latest");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch latest invoices:", error);
      throw error;
    }
  },

  getTotalInvoices: async (
    query: string,
  ): Promise<number> => {
    try {
      console.log("Fetching total invoices...");
      const response = await api.get<number>(`invoices-total?keyword=${query.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch total invoices:", error);
      throw error;
    }
  },

  getTotalPaidInvoices: async (): Promise<number> => {
    try {
      console.log("Fetching total invoices...");
      const response = await api.get<number>("/invoices-total?status=paid");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch total paid invoices:", error);
      throw error;
    }
  },

  getTotalPendingInvoices: async (): Promise<number> => {
    try {
      console.log("Fetching total invoices...");
      const response = await api.get<number>("/invoices-total?status=pending");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch total pending invoices:", error);
      throw error;
    }
  },
};
