'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config'; // adjust this path

export default function AdminPanel() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'admin@example.com') {
        setUserEmail(user.email);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (userEmail !== 'admin@example.com') return <p>Checking admin permissions...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <a href="/admin/products" className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200">
          ➕ Add / Manage Products
        </a>
        <a href="/admin/users" className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200">
          👥 View Users
        </a>
      </div>
    </div>
  );
}