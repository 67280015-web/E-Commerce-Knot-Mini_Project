"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useSession } from 'next-auth/react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const router = useRouter();

  const totalItems = useCartStore((state) => state.getTotalItems());
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowMobileSearch(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/85 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        {/* Mobile Menu Icon & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-stone-700 hover:text-stone-900 p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href="/" className="text-xl font-bold tracking-wider text-stone-900">
            KNOTS<span className="text-amber-700">.</span>
          </Link>
        </div>

        {/* Main Menu (Desktop) */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-stone-600">
          <Link href="/shop" className="hover:text-amber-700 transition-colors">สินค้าทั้งหมด</Link>
          <Link href="/shop?style=minimal" className="hover:text-amber-700 transition-colors">สไตล์มินิมอล</Link>
          <Link href="/shop?style=charm" className="hover:text-amber-700 transition-colors">สไตล์เครื่องราง</Link>
          <Link href="/shop?category=giftset" className="hover:text-amber-700 transition-colors">เซ็ตของขวัญ</Link>
          <Link href="/custom-order" className="hover:text-amber-700 transition-colors">งานสั่งทำ</Link>
          <Link href="/about" className="hover:text-amber-700 transition-colors">เรื่องราวของเรา</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 text-stone-700">
          {/* Search Form (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center bg-stone-100 hover:bg-stone-200/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-700/20 px-3.5 py-1.5 rounded-full border border-stone-200 transition-all">
            <Search size={16} className="text-stone-400 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาสี, ลายถัก..." 
              className="bg-transparent border-none outline-none text-sm w-44 text-stone-800 placeholder:text-stone-400" 
            />
          </form>

          {/* Search Toggle (Mobile/Tablet) */}
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)} 
            className="lg:hidden text-stone-700 hover:text-amber-700 p-1"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          {session ? (
            <Link href="/account" className="hover:text-amber-700 hidden sm:block relative group">
               <div className="w-8 h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
                 {session.user?.name?.charAt(0) || 'U'}
               </div>
            </Link>
          ) : (
            <Link href="/login" className="hover:text-amber-700 hidden sm:block p-1" aria-label="Account">
              <User size={20} />
            </Link>
          )}

          <Link href="/account?tab=wishlist" className="hover:text-amber-700 hidden sm:block p-1" aria-label="Wishlist">
            <Heart size={20} />
          </Link>
          
          <Link href="/cart" className="hover:text-amber-700 relative flex items-center p-1" aria-label="Cart">
            <ShoppingBag size={20} />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {showMobileSearch && (
        <div className="lg:hidden px-4 py-3 bg-stone-50 border-t border-stone-200">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-white px-4 py-2 rounded-2xl border border-stone-300 shadow-sm">
            <Search size={18} className="text-stone-400 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อสินค้า, สี, สไตล์..." 
              autoFocus
              className="w-full bg-transparent border-none outline-none text-sm text-stone-800" 
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="text-stone-400 p-1">
                <X size={16} />
              </button>
            )}
            <button type="submit" className="ml-2 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg font-bold">
              ค้นหา
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 px-6 py-6 space-y-4 shadow-xl">
          <Link 
            href="/shop" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-stone-800 hover:text-amber-700"
          >
            สินค้าทั้งหมด
          </Link>
          <Link 
            href="/shop?style=minimal" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-stone-800 hover:text-amber-700"
          >
            สไตล์มินิมอล
          </Link>
          <Link 
            href="/shop?style=charm" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-stone-800 hover:text-amber-700"
          >
            สไตล์เครื่องราง
          </Link>
          <Link 
            href="/shop?category=giftset" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-stone-800 hover:text-amber-700"
          >
            เซ็ตของขวัญ
          </Link>
          <Link 
            href="/custom-order" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-stone-800 hover:text-amber-700"
          >
            งานสั่งทำ (Custom Order)
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-stone-800 hover:text-amber-700"
          >
            เรื่องราวของเรา
          </Link>
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <Link 
              href="/account" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-stone-700 hover:text-amber-700"
            >
              บัญชีของฉัน
            </Link>
            <Link 
              href="/faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-stone-500 hover:text-stone-800"
            >
              ช่วยเหลือ (FAQ)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
