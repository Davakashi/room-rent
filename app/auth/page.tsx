"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";
import AnimatedBackground from "../../components/background";
import Login from "./_components/login";
import SignUp from "./_components/signup";

const Auth = () => {
  const [page, setPage] = React.useState<"signin" | "signup">("signin");
  const { isAuth, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Нэвтэрсэн хэрэглэгчийг auth хуудаснаас хорих
    if (!isLoading && isAuth) {
      router.replace("/");
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

  if (isAuth) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 h-screen overflow-hidden relative">
      <AnimatePresence mode="wait">
        {page === "signin" ? (
          <>
            <motion.div
              key="signin-form"
              initial={{ x: 600, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 600, opacity: 0 }}
              transition={{ duration: 1 }}
              className="col-span-7 z-0"
            >
              <Login />
            </motion.div>

            <motion.div
              key="signin-panel"
              initial={{ x: -900, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -900, opacity: 0 }}
              transition={{ duration: 1 }}
              className="col-span-5 bg-primary sm:flex items-center justify-center z-10 relative hidden"
            >
              <AnimatedBackground asBackground={true} className="absolute inset-0" />
              <div className="relative z-10 text-center flex flex-col gap-8 text-white font-semibold">
                <p className="text-6xl font-bold">Сайн байна уу!</p>
                <p>Та шинээр бүртгүүлэх бол доорх товчин дээр дарна уу.</p>
                <Button onClick={() => setPage("signup")} variant={"ghost"} className="rounded-full border py-6">
                  Бүртгүүлэх
                </Button>
              </div>
            </motion.div>
            <div className="flex sm:hidden justify-center">
              <div className="w-[300px] flex gap-6 justify-center text-sm">
                <p>Та бүртгэлгүй юу?</p>
                <p onClick={() => setPage("signup")} className="hover:underline">
                  Бүртгүүлэх
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <motion.div
              key="signup-panel"
              initial={{ x: 900, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 900, opacity: 0 }}
              transition={{ duration: 1 }}
              className="col-span-5 bg-primary sm:flex hidden items-center justify-center z-10 relative"
            >
              <AnimatedBackground asBackground={true} className="absolute inset-0" />
              <div className="relative z-10 text-center sm:flex flex-col gap-8 text-white font-semibold hidden">
                <p className="text-6xl font-bold">Сайн байна уу!</p>
                <p>Та шинээр бүртгэлтэй бол нэвтэрнэ үү.</p>
                <Button onClick={() => setPage("signin")} variant={"ghost"} className="rounded-full border py-6">
                  Нэвтрэх
                </Button>
              </div>
            </motion.div>

            <motion.div
              key="signup-form"
              initial={{ x: -600, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -600, opacity: 0 }}
              transition={{ duration: 1 }}
              className="col-span-7 z-0"
            >
              <SignUp />
            </motion.div>
            <div className="flex sm:hidden justify-center">
              <div className="w-[300px] flex gap-6 justify-center text-sm">
                <p>Та бүртгэлтэй юу?</p>
                <p onClick={() => setPage("signin")} className="hover:underline">
                  Нэвтрэх
                </p>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;
