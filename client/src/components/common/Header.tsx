import Image from "next/image";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { DropDown } from "./DropDown";
import Link from "next/link";

export const Header = () => {
  const userLoggedIn = false;

  return (
    <header className="w-full flex flex-row border-b bg-white sticky top-0 left-0 z-10 shadow-sm pr-4">
      
      {/* Left section */}
      <div className="w-1/5 max-w-[200px] mr-4 flex items-center justify-center">
        <Image alt="logo" src="/logo.svg" width={200} height={100} />
      </div>

      {/* Right section */}
      <div className="flex-1 flex flex-col gap-3 py-2">
        
        {/* Top links */}
        <div className="flex justify-end items-center gap-2 text-sm">
          {userLoggedIn && (
            <div className="px-2 border-r border-gray-300 flex items-center justify-center">Shubham Mehta</div>
          )}
          <div className="px-2 hover:text-gray-800 cursor-pointer">About</div>
          <div className="px-2 hover:text-gray-800 cursor-pointer">Customer Care</div>
          {!userLoggedIn && (
            <Link
              href="/register"
              className="px-2 border-l border-gray-300 font-semibold hover:text-gray-800"
            >
              Sign Up
            </Link>
          )}
          {!userLoggedIn && (
            <Link
              href="/login"
              className="px-2 border-l border-gray-300 font-semibold hover:text-gray-800"
            >
              Sign In
            </Link>
          )}
          {userLoggedIn && (
            <div className="px-2 border-l border-gray-300 font-semibold">
              <DropDown
                header="My Account"
                routes={[
                  { label: "Orders", href: "/orders" },
                  { label: "Wishlist", href: "/wishlist" },
                  { label: "Logout", href: "/logout" },
                ]}
              />
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div className="flex gap-4 items-center justify-end">
          
          {/* Categories */}
          <div className="flex gap-4 pr-5 text-gray-700 font-medium">
            <span className="hover:text-gray-800 cursor-pointer">Men</span>
            <span className="hover:text-gray-800 cursor-pointer">Women</span>
            <span className="hover:text-gray-800 cursor-pointer">Kids</span>
            <span className="hover:text-gray-800 cursor-pointer">Beauty</span>
            <span className="hover:text-gray-800 cursor-pointer">Home & Kitchen</span>
          </div>

          {/* Search input */}
          <div className="relative w-3/5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search product here ..."
              className="w-full border border-gray-300 rounded-md py-1 pl-10 pr-3 focus:outline-none focus:ring-2 focus:gray-700 focus:border-transparent transition duration-200 "
            />
          </div>

          {/* Icons */}
          <Heart className="text-gray-600 hover:text-gray-800 cursor-pointer transition" size={20} />
          <ShoppingCart className="text-gray-600 hover:text-gray-800 cursor-pointer transition" size={20} />

        </div>
      </div>
    </header>
  );
};
