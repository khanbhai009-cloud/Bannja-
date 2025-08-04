'use client'; import { useState, useEffect } from 'react'; import { motion } from 'framer-motion'; import { initializeApp } from 'firebase/app'; import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'; import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const firebaseConfig = { apiKey: 'AIzaSyAfrd2gvEhS4TEY2RrqL2ftYz9g5_Cupcs', authDomain: 'weby-44491.firebaseapp.com', projectId: 'weby-44491', storageBucket: 'weby-44491.firebaseapp.com', messagingSenderId: '814932604590', appId: '1:814932604590:web:92685964ce5e2e75961f3f', measurementId: 'G-0LKL7H849G' };

const app = initializeApp(firebaseConfig); const auth = getAuth(app); const db = getFirestore(app);

export default function FashionStore() { const [user, setUser] = useState(null); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [showLogin, setShowLogin] = useState(false); const [products, setProducts] = useState([]);

useEffect(() => { onAuthStateChanged(auth, async (user) => { if (user) { setUser(user); } else { setUser(null); } }); }, []);

const login = async () => { try { await signInWithEmailAndPassword(auth, email, password); } catch (error) { alert('Login failed'); } };

const logout = async () => { await signOut(auth); };

useEffect(() => { const fetchProducts = async () => { const q = query(collection(db, 'products')); const snapshot = await getDocs(q); const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); setProducts(list); }; fetchProducts(); }, []);

return ( <div className="p-4 max-w-6xl mx-auto"> <h1 className="text-2xl font-bold mb-4 text-center">🛍️ Welcome to Bannja Shop</h1>

<div className="flex justify-between items-center mb-6">
    {user ? (
      <div className="space-x-4">
        <span className="text-sm">Welcome, {user.email}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    ) : (
      <button
        onClick={() => setShowLogin(true)}
        className="bg-purple-600 text-white px-3 py-1 rounded"
      >
        Profile
      </button>
    )}
  </div>

  {showLogin && !user && (
    <div className="border p-4 rounded mb-6">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={login}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        Login
      </button>
    </div>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map((p, i) => (
      <motion.div
        key={p.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className="border rounded-lg p-4 shadow"
      >
        <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded" />
        <h2 className="font-semibold text-lg mt-2">{p.name}</h2>
        <p className="text-sm text-gray-600">{p.description}</p>
        <p className="text-pink-600 font-bold mt-1">${p.price}</p>
        <a
          href={p.link}
          target="_blank"
          className="block text-center bg-black text-white mt-3 py-2 rounded hover:bg-gray-800"
        >
          Buy Now
        </a>
      </motion.div>
    ))}
  </div>
</div>

); }

                  
