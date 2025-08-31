"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SignInForm, signInSchema } from "@/types/auth";

const SignInPage = () => {
  const [formData, setFormData] = useState<SignInForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInForm, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = signInSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignInForm, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof SignInForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // ✅ Valid data
    console.log("User Signed Up:", result.data);

    // Reset form
    setFormData({ email: "", password: "" });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">lyceum AI</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                className={`h-10 ${errors.email ? "border-red-500" : ""}`}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                className={`h-10 ${errors.password ? "border-red-500" : ""}`}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full custom-btn">
              Sign In
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
      <div className="mt-10 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a className="cursor-pointer">Terms of Service</a> and{" "}
        <a className="cursor-pointer">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default SignInPage;
