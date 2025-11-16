"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth/context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SignOutButton = ({ className }: { className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      logout();
      setOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isLoading}
          className={`group relative flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#39ae9f]/30 disabled:opacity-50 ${className}`}
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Гарж байна...</span>
            </span>
          ) : (
            <span className="relative z-10">Гарах</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Гарах</DialogTitle>
          <DialogDescription className="text-gray-600">
            Та гарахдаа итгэлтэй байна уу? Та өөрийн бүртгэлдээ нэвтрэхийн тулд дахин нэвтрэх шаардлагатай болно.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Үгүй
          </Button>
          <Button
            onClick={handleSignOut}
            disabled={isLoading}
            className="bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] text-white hover:scale-105 transition-all duration-300 rounded-lg"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Гарч байна...</span>
              </span>
            ) : (
              "Тийм"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutButton;
