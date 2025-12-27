import { Convert } from "@/app/types/login";
import axios from "axios";
import api from '@/lib/axios';

export const createCustomer = async (payload: any) => {
  try {
    const response = await api.post(`/customers`, payload, {
      headers: {
        "Content-Type": "application/json",
        
      },
    });
    
    return {
      data: Convert.toLoginRes(JSON.stringify(response.data)),
      success: response.data.success,
      message: response.data.message,
    };
  } catch (err: any) {
    return { data: null, error: err.response?.data || err.message };
  }
};