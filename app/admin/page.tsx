// app/admin/page.tsx "use client";

import { useEffect, useState } from "react"; import { useRouter } from "next/navigation"; import { auth, db } from "@/lib/firebase"; import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"; import { onAuthStateChanged } from "firebase/auth";

export default function AdminPanel() { const router = useRouter(); const [email, setEmail] = useState(""); const [users, setUsers] = useState<any[]>([]); const [products, setProducts] = useState<any[]>([]); const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "", link: "", tag: "New" });

useEffect(() => { const unsubscribe = onAuthStateChanged(auth, (user) => { if (!user) return router.push("/login"); if (user.email !== "admin@example.com") return router.push("/user"); setEmail(user.email); fetchUsers(); fetchProducts(); }); return () => unsubscribe(); }, []);

const fetchUsers = async () => { const snapshot = await getDocs(collection(db, "users")); const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); setUsers(data); };

const fetchProducts = async () => { const snapshot = await getDocs(collection(db, "products")); const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); setProducts(data); };

const handleAddProduct = async () => { await addDoc(collection(db, "products"), newProduct); setNewProduct({ name: "", price: "", image: "", link: "", tag: "New" }); fetchProducts(); };

const handleDeleteProduct = async (id: string) => { await deleteDoc(doc(db, "products", id)); fetchProducts(); };

return ( <div className="p-4"> <h1 className="text-2xl font-bold mb-4">Admin Panel</h1> <div className="mb-6"> <h2 className="text-xl font-semibold">Add Product</h2> <input className="border p-1 mr-2" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} /> <input className="border p-1 mr-2" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} /> <input className="border p-1 mr-2" placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} /> <input className="border p-1 mr-2" placeholder="Affiliate Link" value={newProduct.link} onChange={(e) => setNewProduct({ ...newProduct, link: e.target.value })} /> <select className="border p-1 mr-2" value={newProduct.tag} onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })} > <option>New</option> <option>Best Seller</option> </select> <button className="bg-blue-500 text-white px-3 py-1" onClick={handleAddProduct}> Add </button> </div> <div className="mb-6"> <h2 className="text-xl font-semibold">Product List</h2> <ul> {products.map((product) => ( <li key={product.id} className="mb-2"> <img src={product.image} alt={product.name} className="w-20 inline-block mr-2" /> {product.name} — ${product.price} — [{product.tag}] <button onClick={() => handleDeleteProduct(product.id)} className="ml-2 bg-red-500 text-white px-2" > Delete </button> </li> ))} </ul> </div> <div> <h2 className="text-xl font-semibold">Users</h2> <ul> {users.map((user) => ( <li key={user.id}>{user.email}</li> ))} </ul> </div> </div> ); }

