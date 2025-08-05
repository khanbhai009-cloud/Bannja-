"use client";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const auth = getAuth(firebaseApp);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user.email === "admin@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20">
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-2 p-2 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-black text-white w-full p-2" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
