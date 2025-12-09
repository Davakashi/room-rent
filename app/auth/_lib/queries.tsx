"use server";

import { apiPost } from "@/lib/api/client";

export async function signUp(data: { fullName: string; email: string; password: string }) {
  try {
    // Use backend API for signup instead of Prisma
    const result = await apiPost<{
      success: boolean;
      user: {
        id: string;
        name: string;
        email: string;
      };
      access_token?: string;
      message?: string;
    }>("/users", {
      name: data.fullName,
      email: data.email,
      password: data.password,
    });

    if (result.success && result.user) {
      return {
        success: true,
        user: result.user,
        autoLogin: !!result.access_token,
      };
    }

    throw new Error(result.message || "Signup failed");
  } catch (error: any) {
    console.error("Signup error:", error);
    
    // Handle backend API errors
    if (error?.message?.includes("Email already in use") || error?.message?.includes("email")) {
      throw new Error("Email already in use");
    }

    throw new Error(error?.message || "Signup failed. Please try again.");
  }
}
