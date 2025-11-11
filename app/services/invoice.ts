import api from "@/lib/axios";
import { Invoice } from "@/app/types";
import { LatestInvoice } from "../lib/definitions";

export const invoiceService = {
  getInvoices: async (): Promise<Invoice[]> => {
    try {
      const response = await api.get<Invoice[]>('/invoices');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
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

  createInvoice: async (invoice: Omit<Invoice, 'id'>): Promise<Invoice> => {
    try {
      const response = await api.post<Invoice>('/invoices', invoice);
      return response.data;
    } catch (error) {
      console.error('Failed to create invoice:', error);
      throw error;
    }
  },

  updateInvoice: async (id: string, invoice: Partial<Invoice>): Promise<Invoice> => {
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
      const response = await api.get<LatestInvoice[]>('/invoices/latest');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch latest invoices:', error);
      throw error;
    }
  },
};