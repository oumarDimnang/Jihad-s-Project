import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-gray-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-black items-center space-x-2 flex"
          >
            CarWeb
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-gray-600 hover:text-gray-900 transition duration-300
					 ease-in-out"
            >
              Home
            </Link>
            <Link
              to={"/ai-assistant-chat"}
              className="text-white transition duration-300
					 ease-in-out bg-violet-600 hover:bg-violet-800 px-3 py-2 rounded-2xl"
            >
              AI Assistant
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-gray-600 hover:text-gray-900 transition duration-300 
							ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-gray-900"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-gray-900 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-gray-800 transition duration-300 ease-in-out"
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                className="bg-[#232323] hover:bg-gray-700 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Vender Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-[#232323] hover:bg-gray-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
