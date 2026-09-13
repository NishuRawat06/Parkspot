"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/auth-context";
import LoginCard from "./auth/LoginCard";
import DemoCredentials from "./auth/DemoCredentials";

/** Login screen logic: credentials state + auth call + redirect. */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Login successful");
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err: unknown) {
      console.log("error", err);
      toast.error(
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Login failed",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 w-110">
      <LoginCard
        email={email}
        password={password}
        submitting={submitting}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
      <DemoCredentials onFill={(demoEmail, demoPassword) => {
        setEmail(demoEmail);
        setPassword(demoPassword);
      }} />
    </div>
  );
}
