import api from "@/lib/axios";
import { Revenue } from "@/app/types";

export const revenueService = {
  getRevenues: async (): Promise<Revenue[]> => {
    try {
      const response = await api.get<Revenue[]>('/revenues');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch revenues:', error);
      throw error;
    }
  },

  getRevenueById: async (id: number): Promise<Revenue> => {
    try {
      const response = await api.get<Revenue>(`/revenues/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch revenue ${id}:`, error);
      throw error;
    }
  },

  createRevenue: async (revenue: Omit<Revenue, 'id'>): Promise<Revenue> => {
    try {
      const response = await api.post<Revenue>('/revenues', revenue);
      return response.data;
    } catch (error) {
      console.error('Failed to create revenue:', error);
      throw error;
    }
  },

  updateRevenue: async (id: string, revenue: Partial<Revenue>): Promise<Revenue> => {
    try {
      const response = await api.put<Revenue>(`/revenues/${id}`, revenue);
      return response.data;
    } catch (error) {
      console.error(`Failed to update revenue ${id}:`, error);
      throw error;
    }
  },

  deleteRevenue: async (id: number): Promise<void> => {
    try {
      await api.delete(`/revenues/${id}`);
    } catch (error) {
      console.error(`Failed to delete revenue ${id}:`, error);
      throw error;
    }
  },
};