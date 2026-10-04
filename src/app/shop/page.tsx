"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

// Mock Data
const mockProducts = [
  { id: 1, name: 'Daisy Dream', price: 250, style: 'สไตล์มินิมอล', status: 'พร้อมส่ง', img: 'รูปสินค้า 1' },
  { id: 2, name: 'Minimal Knot', price: 190, style: 'สไตล์มินิมอล', status: 'สั่งทำ 3-5 วัน', img: 'รูปสินค้า 2' },
  { id: 3, name: 'Lucky Stone (Rose Quartz)', price: 320, style: 'สไตล์เครื่องราง', status: 'พร้อมส่ง', img: 'รูปสินค้า 3' },
  { id: 4, name: 'Earth Tone Set', price: 450, style: 'เซ็ตของขวัญ', status: 'พร้อมส่ง', img: 'รูปสินค้า 4' },
  { id: 5, name: 'Ocean Breeze', price: 220, style: 'สไตล์มินิมอล', status: 'พร้อมส่ง', img: 'รูปสินค้า 5' },
  { id: 6, name: 'Wealthy Charm (Jade)', price: 350, style: 'สไตล์เครื่องราง', status: 'สั่งทำ 3-5 วัน', img: 'รูปสินค้า 6' },
  { id: 7, name: 'Lover Set (คู่รัก)', price: 590, style: 'เซ็ตของขวัญ', status: 'สั่งทำ 3-5 วัน', img: 'รูปสินค้า 7' },
  { id: 8, name: 'Classic Loop', price: 150, style: 'สไตล์มินิมอล', status: 'พร้อมส่ง', img: 'รูปสินค้า 8' },
  { id: 9, name: 'Protection Charm (Onyx)', price: 320, style: 'สไตล์เครื่องราง', status: 'พร้อมส่ง', img: 'รูปสินค้า 9' },
];

export default function ShopPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 min-h-screen">
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">สินค้าทั้งหมด</h1>
          <p className="text-stone-500 text-xs mt-1">แสดง {mockProducts.length} รายการ</p>
        </div>
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 border border-stone-300 px-3 py-1.5 rounded-full text-sm font-medium text-stone-700 bg-white"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`w-full md:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden'} md:block`}>
        <div className="sticky top-24 space-y-8">
          
          <div className="hidden md:block mb-8">
            <h1 className="text-3xl font-bold text-stone-800">สินค้าทั้งหมด</h1>
            <p className="text-stone-500 text-sm mt-2">แสดง {mockProducts.length} รายการ</p>
          </div>

          {/* Category Filter */}
          <div className="border-b border-stone-200 md:border-none pb-6 md:pb-0">
            <h3 className="font-semibold text-stone-800 mb-4 flex justify-between items-center">
              หมวดหมู่ <ChevronDown size={16} className="text-stone-400"/>
            </h3>
            <ul className="space-y-3 text-sm text-stone-600">
              <li><label className="flex items-center gap-3 cursor-pointer hover:text-amber-600"><input type="radio" name="cat" className="accent-amber-600 w-4 h-4" defaultChecked /> สินค้าทั้งหมด</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer hover:text-amber-600"><input type="radio" name="cat" className="accent-amber-600 w-4 h-4" /> สไตล์มินิมอล</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer hover:text-amber-600"><input type="radio" name="cat" className="accent-amber-600 w-4 h-4" /> สไตล์เครื่องราง</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer hover:text-amber-600"><input type="radio" name="cat" className="accent-amber-600 w-4 h-4" /> เซ็ตของขวัญ</label></li>
            </ul>
          </div>

          {/* Status Filter */}
          <div className="border-b border-stone-200 md:border-none pb-6 md:pb-0">
            <h3 className="font-semibold text-stone-800 mb-4 flex justify-between items-center">
              สถานะ <ChevronDown size={16} className="text-stone-400"/>
            </h3>
            <ul className="space-y-3 text-sm text-stone-600">
              <li><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="accent-amber-600 w-4 h-4 rounded border-stone-300" /> พร้อมส่ง</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="accent-amber-600 w-4 h-4 rounded border-stone-300" /> สั่งทำ (Custom)</label></li>
            </ul>
          </div>

          {/* Color Filter */}
          <div className="border-b border-stone-200 md:border-none pb-6 md:pb-0">
            <h3 className="font-semibold text-stone-800 mb-4 flex justify-between items-center">
              สีเชือก <ChevronDown size={16} className="text-stone-400"/>
            </h3>
            <div className="flex flex-wrap gap-3">
              {['bg-stone-100', 'bg-stone-800', 'bg-amber-700', 'bg-blue-200', 'bg-green-700', 'bg-rose-300', 'bg-purple-300', 'bg-orange-300'].map((color, i) => (
                <button key={i} className={`w-7 h-7 rounded-full border border-stone-300 ${color} hover:scale-110 transition-transform shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1`} aria-label="color select"></button>
              ))}
            </div>
          </div>

          {/* Hook Type */}
          <div className="border-b border-stone-200 md:border-none pb-6 md:pb-0">
            <h3 className="font-semibold text-stone-800 mb-4 flex justify-between items-center">
              แบบตะขอ <ChevronDown size={16} className="text-stone-400"/>
            </h3>
            <ul className="space-y-3 text-sm text-stone-600">
              <li><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="accent-amber-600 w-4 h-4 rounded border-stone-300" /> ตะขอก้ามปู (Lobster)</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="accent-amber-600 w-4 h-4 rounded border-stone-300" /> ห่วงกลม (Keyring)</label></li>
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-semibold text-stone-800 mb-4 flex justify-between items-center">
              ราคา <ChevronDown size={16} className="text-stone-400"/>
            </h3>
            <div className="flex items-center gap-3">
              <input type="number" placeholder="Min" className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
              <span className="text-stone-400">-</span>
              <input type="number" placeholder="Max" className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
            </div>
            <button className="w-full mt-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium py-2 rounded-md text-sm transition-colors">
              ใช้ตัวกรอง
            </button>
          </div>

        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1">
        {/* Active Filters & Sort */}
        <div className="hidden md:flex justify-between items-center mb-8 pb-4 border-b border-stone-200">
          <div className="flex gap-2">
            {/* Mock Active Filters */}
            <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">
              หมวดหมู่: ทั้งหมด <button className="hover:text-stone-900"><X size={12} /></button>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-stone-600">
            <span>เรียงตาม:</span>
            <select className="bg-transparent border border-stone-300 rounded-md px-2 py-1 outline-none font-medium text-stone-800 cursor-pointer focus:border-amber-500">
              <option>สินค้าแนะนำ</option>
              <option>มาใหม่ล่าสุด</option>
              <option>ราคา: ต่ำไปสูง</option>
              <option>ราคา: สูงไปต่ำ</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6">
          {mockProducts.map((prod) => (
            <Link href={`/product/${prod.id}`} key={prod.id} className="group cursor-pointer flex flex-col">
              <div className="bg-stone-100 aspect-[4/5] rounded-xl mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition duration-700 flex items-center justify-center">
                  <span className="text-stone-400 text-sm">{prod.img}</span>
                </div>
              </div>
              <h3 className="font-semibold text-stone-800 group-hover:text-amber-700 transition-colors text-base">{prod.name}</h3>
              <div className="flex justify-between items-center mt-1.5">
                <span className="text-stone-900 font-medium">฿{prod.price}</span>
                <span className="text-[10px] bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full">{prod.status}</span>
              </div>
              <p className="text-xs text-stone-500 mt-1.5">{prod.style}</p>
            </Link>
          ))}
        </div>

        {/* Pagination Mock */}
        <div className="flex justify-center mt-16 gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-800 text-white text-sm font-medium shadow-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-600 text-sm font-medium transition-colors">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-600 text-sm font-medium transition-colors">3</button>
        </div>
      </main>

    </div>
  );
}
