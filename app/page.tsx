// File: app/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      } else {
        router.push("/login");
      }
    });
  }, []);

  return null;
}