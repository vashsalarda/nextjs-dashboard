import api from "@/lib/axios";
import { Customer, CustomerPage, CustomerPageWithTotal } from "@/app/types";
import { CustomersTableType } from "../lib/definitions";

export const customerService = {
  getCustomers: async (): Promise<CustomerPage> => {
    try {
      const response = await api.get<CustomerPage>("/customers");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      throw error;
    }
  },

  getTotalCustomers: async (query: string): Promise<number> => {
    try {
      const response = await api.get<number>(
        `customers-total?keyword=${query.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch total customers:", error);
      throw error;
    }
  },

  getCustomersWithTotals: async (
    query: string,
    pageNumber: number,
    pageSize: number
  ): Promise<CustomerPageWithTotal> => {
    const params = new URLSearchParams();
    if (query) params.append("keyword", query);
    if (pageNumber) params.append("page", pageNumber.toString());
    if (pageSize) params.append("size", pageSize.toString());

    try {
      const url = `/customers-with-total${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      console.log("Fetching invoice data...");
      const response = await api.get<CustomerPageWithTotal>(url);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch total customers:", error);
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

  createCustomer: async (customer: Omit<Customer, "id">): Promise<Customer> => {
    try {
      const response = await api.post<Customer>("/customers", customer);
      return response.data;
    } catch (error) {
      console.error("Failed to create customer:", error);
      throw error;
    }
  },

  updateCustomer: async (
    id: string,
    customer: Partial<Customer>
  ): Promise<Customer> => {
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

  getCustomersByQuery: async (
    query: string,
    pageNumber: number,
    pageSize: number
  ): Promise<CustomerPage> => {
    const params = new URLSearchParams();
    if (query) params.append("keyword", query);
    if (pageNumber) params.append("page", pageNumber.toString());
    if (pageSize) params.append("size", pageSize.toString());

    try {
      const response = await api.get<CustomerPage>("/customers");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      throw error;
    }
  },
};
