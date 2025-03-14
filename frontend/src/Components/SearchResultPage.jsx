import { useSelector,useDispatch } from "react-redux";
import { clearProducts, fetchProductsByQuery } from "../Redux/Slices/productSlices";
import { useState } from "react";

function SearchResultPage() {
  const { loading, products, error } = useSelector((state) => state.productsList);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  // Handle search query
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(clearProducts());

    if (searchQuery.trim()){
      dispatch(fetchProductsByQuery(searchQuery));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">

      <nav className="bg-gray-800 text-white p-4 flex items-center justify-center">
        <div className="text-xl font-bold cursor-pointer relative right-96">MyShop</div>
        <form onSubmit={handleSearch} className="flex items-center ">
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
        
      </nav>

      {/* Products Section */}
      <div className="flex-grow p-8">
        <h2 className="text-2xl font-bold mb-4">Search Result Products</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error loading products: {error}</div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="border p-4 rounded-md shadow-lg text-center">
                <img
                  src={product.images[0]?.secure_url}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2"
                />
                <p className="font-semibold text-wrap">{product.name}</p>
                <p className="text-gray-600 ">{product.price}rs</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-red-500">No products found</div>
        )}
      </div>
    </div>
  );
}


export default SearchResultPage;