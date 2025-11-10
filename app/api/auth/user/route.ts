import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.AUTH_URL; // Define your backend voter API URL in .env.local

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON body from request
    const response = await axios.post(`${API_URL}/auth/signin`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if ([200, 201].includes(response.status)) {
      return NextResponse.json({
        success: true,
        data: response.data,
        message: "Login successful.",
      });
    }
    if (response.status === 400) {
      return NextResponse.json({
        success: false,
        data: response.data,
        message: "Login failed. Invalid credentials.",
      });
    }
    return NextResponse.json({
      data: null,
      success: false,
      message: "Login failed.",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Login failed",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
