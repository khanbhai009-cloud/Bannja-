// File: app/layout.tsx import "@/app/globals.css"; import { Inter } from "next/font/google"; import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) { return ( <html lang="en"> <body className={inter.className}>{children}</body> </html> ); }

// File: app/page.tsx "use client"; import { useRouter } from "next/navigation"; import { useEffect } from "react"; import { getAuth, onAuthStateChanged } from "firebase/auth"; import { firebaseApp } from "@/lib/firebase";

export default function Home() { const router = useRouter();

useEffect(() => { const auth = getAuth(firebaseApp); onAuthStateChanged(auth, (user) => { if (user) { if (user.email === "admin@example.com") { router.push("/admin"); } else { router.push("/user"); } } else { router.push("/login"); } }); }, []);

return null; }

// File: lib/firebase.ts import { initializeApp } from "firebase/app"; const firebaseConfig = { apiKey: "YOUR_API_KEY", authDomain: "YOUR_AUTH_DOMAIN", projectId: "YOUR_PROJECT_ID", storageBucket: "YOUR_STORAGE_BUCKET", messagingSenderId: "YOUR_MSG_ID", appId: "YOUR_APP_ID", }; export const firebaseApp = initializeApp(firebaseConfig);

// File: app/login/page.tsx "use client"; import { useState } from "react"; import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; import { firebaseApp } from "@/lib/firebase"; import { useRouter } from "next/navigation";

export default function LoginPage() { const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const router = useRouter();

const handleLogin = async () => { const auth = getAuth(firebaseApp); try { const userCredential = await signInWithEmailAndPassword(auth, email, password); const user = userCredential.user; if (user.email === "admin@example.com") { router.push("/admin"); } else { router.push("/user"); } } catch (err) { alert("Login failed"); } };

return ( <div className="p-4 max-w-md mx-auto mt-20"> <input type="email" placeholder="Email" className="w-full mb-2 p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} /> <input type="password" placeholder="Password" className="w-full mb-2 p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} /> <button className="bg-black text-white w-full p-2" onClick={handleLogin}> Login </button> </div> ); }

// Reminder: You'll need to add /admin/page.tsx and /user/page.tsx next.

