"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth/context";
import { apiPost } from "@/lib/api/client";
import { formatErrorMessage } from "@/lib/errors/error-handler";
import GoogleLoginButton from "../button/google-button";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Send credentials to backend for JWT authentication
      const result = await apiPost<{
        success: boolean;
        user: any;
        access_token: string;
        message: string;
      }>("/users/login", {
        email: data.email,
        password: data.password,
      });

      // Store token and user data
      if (result.access_token && result.user) {
        login(result.access_token, result.user);
        toast.success("Амжилттай нэвтэрлээ");
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = formatErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[300px] sm:w-[400px] flex flex-col gap-6">
      <p className="text-center font-mono font-bold text-primary text-4xl mb-6">Нэвтрэх</p>
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-normal text-gray-500">И-Мэйл</Label>
        <Input className="py-6 rounded" placeholder="example@gmail.com" {...register("email")} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-normal text-gray-500">Нууц үг</Label>
        <Input className="py-6 rounded" type="password" placeholder="********" {...register("password")} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" {...register("remember")} />
          <Label htmlFor="remember" className="text-sm cursor-pointer">
            Сануулах
          </Label>
        </div>
        <Link href="/auth/forgot" className="text-sm text-primary hover:underline">
          Нууц үгээ мартсан?
        </Link>
      </div>

      <Button type="submit" className="py-6 rounded-full" disabled={loading}>
        {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
      </Button>

      <div className="flex items-center gap-4">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="text-gray-400 text-sm">эсвэл</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      <GoogleLoginButton />
    </form>
  );
};

export default LoginForm;
