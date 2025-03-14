import React, { useState, useEffect } from 'react';
import { fetchProductsByQuery, fetchProducts, clearProducts} from '../Redux/Slices/productSlices';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

//** Homepage product fetching is done , and i have to improve the homepage design and add more features.

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching , setIsSearching] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {products , loading , error } = useSelector((state)=> state.productsList)

  // Toggle the slider menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle search query
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    dispatch(clearProducts());

    if (searchQuery.trim()){
      dispatch(fetchProductsByQuery(searchQuery));
      navigate("/products/fetchProductsByQuery");
    }else{
      setIsSearching(false);
      dispatch(fetchProducts());
    }
  };

  useEffect(() => {
    if(!isSearching){
      dispatch(clearProducts());
      dispatch(fetchProducts());
    }
    
  }, [dispatch , isSearching]);

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
            products.map((product , index) => (
              <div key={index} className="border p-4 rounded-md shadow-lg text-center">
                <img
                  src={product.images[0].secure_url}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2"
                />
                <p className="font-semibold text-wrap">{product.name}</p>
                <p className="text-gray-600 ">{product.price}rs</p>
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
