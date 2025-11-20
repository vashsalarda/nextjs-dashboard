import api from "@/lib/axios";
import { Customer } from "@/app/types";

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    try {
      const response = await api.get<Customer[]>('/customers');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      throw error;
    }
  },

  getTotalCustomers: async (): Promise<number> => {
    try {
      const response = await api.get<number>('/customers-total');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch total customers:', error);
      throw error;
    }
  },

  getCustomerById: async (id: number): Promise<Customer> => {
    try {
      const response = await api.get<Customer>(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch customer ${id}:`, error);
      throw error;
    }
  },

  createCustomer: async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    try {
      const response = await api.post<Customer>('/customers', customer);
      return response.data;
    } catch (error) {
      console.error('Failed to create customer:', error);
      throw error;
    }
  },

  updateCustomer: async (id: string, customer: Partial<Customer>): Promise<Customer> => {
    try {
      const response = await api.put<Customer>(`/customers/${id}`, customer);
      return response.data;
    } catch (error) {
      console.error(`Failed to update customer ${id}:`, error);
      throw error;
    }
  },

  deleteCustomer: async (id: number): Promise<void> => {
    try {
      await api.delete(`/customers/${id}`);
    } catch (error) {
      console.error(`Failed to delete customer ${id}:`, error);
      throw error;
    }
  },
};