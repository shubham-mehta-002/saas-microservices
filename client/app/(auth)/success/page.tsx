"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // cookies already set by backend
    router.replace("/");
  }, []);

  return <p>Signing you in...</p>;
}
