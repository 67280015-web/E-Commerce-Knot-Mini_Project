"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        {/* Mobile Menu Icon & Logo */}
        <div className="flex items-center gap-4 md:gap-0 md:flex-none">
          <button className="md:hidden text-stone-600 hover:text-stone-900">
            <Menu size={24} />
          </button>
          <Link href="/" className="text-xl font-bold tracking-wider text-stone-800">
            KNOTS<span className="text-amber-600">.</span>
          </Link>
        </div>

        {/* Main Menu (Desktop) */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
          <Link href="/shop" className="hover:text-amber-600 transition-colors">สินค้าทั้งหมด</Link>
          <Link href="/shop?style=minimal" className="hover:text-amber-600 transition-colors">สไตล์มินิมอล</Link>
          <Link href="/shop?style=charm" className="hover:text-amber-600 transition-colors">สไตล์เครื่องราง</Link>
          <Link href="/shop?category=giftset" className="hover:text-amber-600 transition-colors">เซ็ตของขวัญ</Link>
          <Link href="/custom-order" className="hover:text-amber-600 transition-colors">งานสั่งทำ</Link>
          <Link href="/about" className="hover:text-amber-600 transition-colors">เรื่องราวของเรา</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5 text-stone-600">
          {/* Search Box (Desktop) */}
          <div className="hidden lg:flex items-center bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
            <Search size={16} className="text-stone-400 mr-2" />
            <input 
              type="text" 
              placeholder="ค้นหาสี, ลายถัก..." 
              className="bg-transparent border-none outline-none text-sm w-40 text-stone-700 placeholder:text-stone-400" 
            />
          </div>
          
          <Link href="/account" className="hover:text-amber-600 hidden sm:block"><User size={20} /></Link>
          <Link href="/account?tab=wishlist" className="hover:text-amber-600 hidden sm:block"><Heart size={20} /></Link>
          <Link href="/cart" className="hover:text-amber-600 relative flex items-center">
            <ShoppingBag size={20} />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
