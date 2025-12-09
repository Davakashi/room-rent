"use server";

import { hash } from "bcryptjs";

import { signIn } from "@/app/auth";
import prisma from "@/lib/prisma";

// Custom AuthError class since next-auth is not installed
class AuthError extends Error {
  type: string;
  constructor(message: string, type: string = "CredentialsSignin") {
    super(message);
    this.type = type;
    this.name = "AuthError";
  }
}

export async function handwrittenLogin(data: { email: string; password: string }) {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error("Invalid email or password");
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid email or password");
        default:
          throw new Error("Authentication failed");
      }
    }
    throw error;
  }
}

export async function signUp(data: { fullName: string; email: string; password: string }) {
  const { fullName, email, password } = data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: fullName,
        email,
        emailVerified: null,
        accounts: {
          create: {
            type: "credentials",
            provider: "credentials",
            providerAccountId: email,
            access_token: hashedPassword,
          },
        },
      },
      include: {
        accounts: true,
      },
    });

    try {
      const loginResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (loginResult?.error) {
        console.warn("User created but auto-login failed:", loginResult.error);
        return {
          success: true,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
          autoLoginFailed: true,
        };
      }

      return {
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        autoLogin: true,
      };
    } catch (loginError) {
      console.warn("Auto-login failed after signup:", loginError);
      return {
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        autoLoginFailed: true,
      };
    }
  } catch (error: any) {
    console.error("Signup error:", error);
    if (error.code === "P2002") {
      throw new Error("Email already in use");
    }

    throw error;
  }
}
