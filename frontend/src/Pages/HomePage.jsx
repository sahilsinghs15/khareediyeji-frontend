import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toggle the slider menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle search query
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Search for: ${searchQuery}`);
  };

  // Fetch products from the backend
  const fetchProducts = async () => {
    setLoading(true); // Start loading
    const toastId = toast.loading('Loading products...'); // Show loading toast
    try {
      const response = await axios.get('/');
      const shuffledProducts = response.data.sort(() => Math.random() - 0.5);
      setProducts(shuffledProducts);
      toast.success('Products loaded successfully!', { id: toastId }); // Replace loading toast with success
    } catch (error) {
      toast.error('Error fetching products!', { id: toastId }); // Replace loading toast with error
      console.error('Error fetching products', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      {/* Main Navigation */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold cursor-pointer">MyShop</div>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="p-2 border border-gray-300 rounded-md text-black"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 ml-2 rounded-md">
            Search
          </button>
        </form>
        <div className="space-x-4 cursor-pointer">
          <span>Orders</span>
          <span>Cart</span>
        </div>
      </nav>

      {/* Secondary Navigation with Menu Icon and Categories */}
      <nav className="bg-gray-100 p-4 flex justify-between items-center">
        <button onClick={toggleMenu} className="text-2xl">
          ☰
        </button>
        <div className="flex space-x-6 cursor-pointer">
          <span>Electronics</span>
          <span>Home Appliances</span>
          <span>Beauty Products</span>
        </div>
      </nav>

      {/* Slide-out Menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-64 h-full bg-gray-900 text-white p-6 z-10">
          <button onClick={toggleMenu} className="text-2xl mb-4 cursor-pointer">
            ← Back
          </button>
          <ul>
            <li className="py-2 cursor-pointer hover:text-gray-300">User Profile</li>
            <li className="py-2 cursor-pointer hover:text-gray-300">Admin Panel</li>
            <li className="py-2 cursor-pointer hover:text-gray-300">Seller Panel</li>
            <li className="py-2 cursor-pointer hover:text-gray-300">Logout</li>
          </ul>
        </div>
      )}

      {/* Products Section */}
      <div className="flex-grow p-8">
        <h2 className="text-2xl font-bold mb-4">Popular Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {!loading && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="border p-4 rounded-md shadow-lg text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2"
                />
                <p className="font-semibold">{product.name}</p>
                <p className="text-gray-600">${product.price}</p>
              </div>
            ))
          ) : null}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 MyShop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
