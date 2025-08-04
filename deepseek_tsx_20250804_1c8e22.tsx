// app/page.tsx
'use client'
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

type Outfit = {
  id?: string;
  name: string;
  description: string;
  punchLine: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt?: string;
};

type User = {
  id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  wishlist: string[];
};

export default function FashionStore() {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'orders' | 'profile' | 'admin-users' | 'admin-outfits' | 'admin-add-outfit'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [filteredOutfits, setFilteredOutfits] = useState<Outfit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [newOutfit, setNewOutfit] = useState<Omit<Outfit, 'id' | 'createdAt'>>({ 
    name: '', 
    description: '', 
    punchLine: '', 
    price: 0, 
    imageUrl: '', 
    category: 'casual' 
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDocs(query(collection(db, 'users'), where('id', '==', user.uid)));
        if (userDoc.empty) {
          // New user - create document
          await addDoc(collection(db, 'users'), {
            id: user.uid,
            email: user.email,
            isAdmin: user.email === 'admin@example.com',
            createdAt: new Date().toISOString(),
            wishlist: []
          });
        }
        
        setCurrentUser({
          id: user.uid,
          email: user.email || '',
          isAdmin: user.email === 'admin@example.com',
          createdAt: new Date().toISOString(),
          wishlist: []
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentView('home');
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.isAdmin && currentView === 'admin-users') {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)));
      }

      if (currentView === 'home' || currentView === 'search' || currentView === 'admin-outfits') {
        const outfitsSnapshot = await getDocs(collection(db, 'outfits'));
        const outfitsData = outfitsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Outfit));
        setOutfits(outfitsData);
        setFilteredOutfits(outfitsData);
      }
    };

    fetchData();
  }, [currentView, currentUser]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOutfits(outfits);
    } else {
      setFilteredOutfits(
        outfits.filter(outfit =>
          outfit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          outfit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          outfit.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, outfits]);

  // Admin functions
  const addOutfit = async () => {
    if (!imageFile) return;
    
    try {
      // Upload image
      const storageRef = ref(storage, `outfits/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // Add outfit to Firestore
      await addDoc(collection(db, 'outfits'), {
        ...newOutfit,
        imageUrl,
        createdAt: new Date().toISOString()
      });

      // Reset form
      setNewOutfit({ 
        name: '', 
        description: '', 
        punchLine: '', 
        price: 0, 
        imageUrl: '', 
        category: 'casual' 
      });
      setImageFile(null);
      alert('Outfit added successfully!');
    } catch (error) {
      console.error('Error adding outfit:', error);
      alert('Failed to add outfit');
    }
  };

  // Helper functions
  const getRandomPrice = () => {
    return (Math.random() * 6 + 1).toFixed(2);
  };

  const getDiscountPrice = (price: number) => {
    return (price * 0.8).toFixed(2);
  };

  const getRandomUserId = () => {
    return `user${Math.floor(Math.random() * 10000)}`;
  };

  const getRandomLikes = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  // Render components
  const renderHome = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Trending Outfits</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredOutfits.map((outfit, index) => (
          <motion.div
            key={outfit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={outfit.imageUrl} 
                  alt={outfit.name} 
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow">
                  <span className="material-icons text-gray-400">favorite_border</span>
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{outfit.name}</h3>
                
                <div className="flex items-center mb-2">
                  <span className="text-gray-500 line-through mr-2">${getRandomPrice()}</span>
                  <span className="text-purple-600 font-bold">${getDiscountPrice(parseFloat(getRandomPrice()))}</span>
                  <span className="ml-auto text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {getRandomLikes()} likes
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-600">
                    {outfit.description.substring(0, 80)}...
                    <button className="text-purple-600 ml-1 text-sm">Read more</button>
                  </p>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <img 
                        key={i}
                        src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        alt={`User ${i}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    Loved by {getRandomUserId()} and {Math.floor(Math.random() * 1000)} others
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  onClick={() => window.open('https://example.com/affiliate-link', '_blank')}
                >
                  SHOP NOW
                </motion.button>
                
                <p className="mt-2 text-xs text-center text-gray-500">
                  "{outfit.punchLine || "Look fabulous without breaking the bank!"}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-purple-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Our Guarantee</h2>
        <p className="mb-4">100% satisfaction guarantee on all purchases! Love it or your money back.</p>
        <p className="text-sm text-gray-600">*Disclaimer: Prices are randomly generated for demonstration purposes. Actual prices may vary on affiliate sites.</p>
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search outfits..."
          className="w-full px-4 py-2 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredOutfits.map(outfit => (
          <div key={outfit.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={outfit.imageUrl} alt={outfit.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{outfit.name}</h3>
              <p className="text-purple-600 font-bold">${outfit.price.toFixed(2)}</p>
              <button className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="container mx-auto px-4 py-8">
      {currentUser ? (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium">{currentUser.id}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{currentUser.email}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
            
            {currentUser.wishlist.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {currentUser.wishlist.map((item, index) => (
                  <li key={index} className="py-3 flex justify-between">
                    <span>Item {index + 1}</span>
                    <button className="text-purple-600">View</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Your wishlist is empty</p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Admin</h2>
            
            <textarea
              className="w-full px-3 py-2 border rounded-lg mb-3"
              rows={3}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            
            <button
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              onClick={() => alert(`Message sent to admin: ${message}`)}
            >
              Send Message
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
          <p className="mb-4">Please sign in to view your profile</p>
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            onClick={() => login('user@example.com', 'user123')}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );

  const renderAdminUsers = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Registered Users</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-purple-600 hover:text-purple-900">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAdminOutfits = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Outfits</h1>
        <button 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setCurrentView('admin-add-outfit')}
        >
          Add New Outfit
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {outfits.map(outfit => (
          <div key={outfit.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={outfit.imageUrl} alt={outfit.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{outfit.name}</h3>
              <p className="text-gray-600">{outfit.description.substring(0, 60)}...</p>
              <p className="text-purple-600 font-bold mt-2">${outfit.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddOutfit = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Outfit</h1>
      
      <form className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Outfit Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={newOutfit.name}
            onChange={(e) => setNewOutfit({...newOutfit, name: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
            value={newOutfit.description}
            onChange={(e) => setNewOutfit({...newOutfit, description: e.target.value})}
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Punch Line</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={newOutfit.punchLine}
            onChange={(e) => setNewOutfit({...newOutfit, punchLine: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price ($)</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg"
            value={newOutfit.price}
            onChange={(e) => setNewOutfit({...newOutfit, price: parseFloat(e.target.value)})}
            step="0.01"
            min="0"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            value={newOutfit.category}
            onChange={(e) => setNewOutfit({...newOutfit, category: e.target.value})}
          >
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="sports">Sports</option>
            <option value="ethnic">Ethnic</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Image</label>
          <input
            type="file"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        
        <button
          type="button"
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          onClick={addOutfit}
        >
          Add Outfit
        </button>
      </form>
    </div>
  );

  const renderOrders = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {currentUser ? (
          <p>You have no orders yet. Start shopping!</p>
        ) : (
          <p>Please sign in to view your orders</p>
        )}
      </div>
    </div>
  );

  // Main render
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">FashionHub</h1>
          
          {currentUser ? (
            <div className="flex items-center space-x-4">
              {currentUser.isAdmin && (
                <button 
                  className="text-purple-600"
                  onClick={() => setCurrentView('admin-users')}
                >
                  Admin Panel
                </button>
              )}
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                onClick={logout}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              onClick={() => login('admin@example.com', 'admin123')}
            >
              Admin Login
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-16">
        {currentView === 'home' && renderHome()}
        {currentView === 'search' && renderSearch()}
        {currentView === 'orders' && renderOrders()}
        {currentView === 'profile' && renderProfile()}
        {currentView === 'admin-users' && renderAdminUsers()}
        {currentView === 'admin-outfits' && renderAdminOutfits()}
        {currentView === 'admin-add-outfit' && renderAddOutfit()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-around">
          {currentUser?.isAdmin ? (
            <>
              <button 
                className={`flex flex-col items-center py-3 px-4 ${currentView === 'admin-users' ? 'text-purple-600' : 'text-gray-600'}`}
                onClick={() => setCurrentView('admin-users')}
              >
                <span className="material-icons">people</span>
                <span className="text-xs mt-1">Users</span>
              </button>
              <button 
                className={`flex flex-col items-center py-3 px-4 ${currentView === 'admin-outfits' ? 'text-purple-600' : 'text-gray-600'}`}
                onClick={() => setCurrentView('admin-outfits')}
              >
                <span className="material-icons">style</span>
                <span className="text-xs mt-1">Outfits</span>
              </button>
              <button 
                className={`flex flex-col items-center py-3 px-4 ${currentView === 'admin-add-outfit' ? 'text-purple-600' : 'text-gray-600'}`}
                onClick={() => setCurrentView('admin-add-outfit')}
              >
                <span className="material-icons">add</span>
                <span className="text-xs mt-1">Add Outfit</span>
              </button>
            </>
          ) : (
            <>
              <button 
                className={`flex flex-col items-center py-3 px-4 ${currentView === 'home' ? 'text-purple-600' : 'text-gray-600'}`}
                onClick={() => setCurrentView('home')}
              >
                <span className="material-icons">home</span>
                <span className="text-xs mt-1">Home</span>
              </button>
              <button 
                className={`flex flex-col items-center py-3 px-4 ${currentView === 'search' ? 'text-purple-600' : 'text-gray-600'}`}
                onClick={() => setCurrentView('search')}
              >
                <span className="material-icons">search</span>
                <span className="text-xs mt-1">Search</span>
              </button>
              <button 
                className={`flex flex-col items-center py-3 px-4 ${currentView === 'orders' ? 'text-purple-600' : 'text-gray-600'}`}
                onClick={() => setCurrentView('orders')}
              >
                <span className="material-icons">shopping_bag</span>
                <span className="text-xs mt-1">Orders</span>
              </button>
              <button 
                className={`flex flex-col items-center py-3 px-4 ${currentView === 'profile' ? 'text-purple-600' : 'text-gray-600'}`}
                onClick={() => setCurrentView('profile')}
              >
                <span className="material-icons">person</span>
                <span className="text-xs mt-1">Profile</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}