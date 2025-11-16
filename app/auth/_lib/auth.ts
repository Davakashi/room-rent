"use server";

import { signIn, signOut } from "@/app/auth";

export const googleLogin = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth" });
};
