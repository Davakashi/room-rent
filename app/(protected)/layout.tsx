"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/partails/header";
import SideBar from "@/components/partails/sidebar";
import { useAuth } from "@/lib/auth/context";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuth, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Нэвтрээгүй хэрэглэгчийг auth хуудас руу redirect хийх
    if (!isLoading && !isAuth) {
      router.replace("/auth");
    }
  }, [isAuth, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return null;
  }

  return (
    <div>
      <div className="sm:hidden flex flex-col flex-grow h-screen overflow-hidden">
        <Header />
        {children}
      </div>
      <div className="sm:flex hidden flex-grow h-screen overflow-hidden">
        <SideBar />
        <div className="flex-1 bg-[#F2F8FC] overflow-auto max-h-screen">{children}</div>
      </div>
    </div>
  );
}
