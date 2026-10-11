"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { products } from '@/data/products';

export default function ShopPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  const filteredProducts = selectedCategory === 'ทั้งหมด' 
    ? products 
    : products.filter(p => p.style === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 min-h-screen">
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">สินค้าทั้งหมด</h1>
          <p className="text-stone-500 text-xs mt-1">แสดง {filteredProducts.length} รายการ</p>
        </div>
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 border border-stone-300 px-3.5 py-1.5 rounded-full text-sm font-semibold text-stone-700 bg-white shadow-sm"
        >
          <SlidersHorizontal size={16} /> ตัวกรอง
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`w-full md:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden'} md:block`}>
        <div className="sticky top-24 space-y-8">
          
          <div className="hidden md:block mb-8">
            <h1 className="text-3xl font-bold text-stone-800">สินค้าทั้งหมด</h1>
            <p className="text-stone-500 text-sm mt-2">แสดง {filteredProducts.length} รายการ</p>
          </div>

          {/* Category Filter */}
          <div className="border-b border-stone-200 md:border-none pb-6 md:pb-0">
            <h3 className="font-bold text-stone-800 mb-4 flex justify-between items-center text-sm">
              หมวดหมู่ <ChevronDown size={16} className="text-stone-400"/>
            </h3>
            <ul className="space-y-3 text-sm text-stone-600">
              {['ทั้งหมด', 'สไตล์มินิมอล', 'สไตล์เครื่องราง', 'เซ็ตของขวัญ'].map((cat) => (
                <li key={cat}>
                  <label 
                    onClick={() => setSelectedCategory(cat)}
                    className="flex items-center gap-3 cursor-pointer hover:text-amber-700 font-medium"
                  >
                    <input 
                      type="radio" 
                      name="cat" 
                      className="accent-amber-600 w-4 h-4 cursor-pointer" 
                      checked={selectedCategory === cat} 
                      onChange={() => setSelectedCategory(cat)}
                    /> 
                    {cat === 'ทั้งหมด' ? 'สินค้าทั้งหมด' : cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Status Filter */}
          <div className="border-b border-stone-200 md:border-none pb-6 md:pb-0">
            <h3 className="font-bold text-stone-800 mb-4 flex justify-between items-center text-sm">
              สถานะ <ChevronDown size={16} className="text-stone-400"/>
            </h3>
            <ul className="space-y-3 text-sm text-stone-600">
              <li><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="accent-amber-600 w-4 h-4 rounded border-stone-300" defaultChecked /> พร้อมส่ง</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="accent-amber-600 w-4 h-4 rounded border-stone-300" defaultChecked /> สั่งทำ (Custom)</label></li>
            </ul>
          </div>

          {/* Color Filter */}
          <div className="border-b border-stone-200 md:border-none pb-6 md:pb-0">
            <h3 className="font-bold text-stone-800 mb-4 flex justify-between items-center text-sm">
              สีเชือก <ChevronDown size={16} className="text-stone-400"/>
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {['bg-stone-100', 'bg-stone-800', 'bg-amber-700', 'bg-blue-200', 'bg-green-700', 'bg-rose-300', 'bg-purple-300', 'bg-orange-300'].map((color, i) => (
                <button key={i} className={`w-7 h-7 rounded-full border border-stone-300 ${color} hover:scale-110 transition-transform shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1`} aria-label="color select"></button>
              ))}
            </div>
          </div>

          {/* Hook Type */}
          <div className="border-b border-stone-200 md:border-none pb-6 md:pb-0">
            <h3 className="font-bold text-stone-800 mb-4 flex justify-between items-center text-sm">
              แบบตะขอ <ChevronDown size={16} className="text-stone-400"/>
            </h3>
            <ul className="space-y-3 text-sm text-stone-600">
              <li><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="accent-amber-600 w-4 h-4 rounded border-stone-300" /> ตะขอก้ามปู (Lobster)</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="accent-amber-600 w-4 h-4 rounded border-stone-300" /> ห่วงกลม (Keyring)</label></li>
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-bold text-stone-800 mb-4 flex justify-between items-center text-sm">
              ช่วงราคา <ChevronDown size={16} className="text-stone-400"/>
            </h3>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="ต่ำสุด" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-500 bg-stone-50" />
              <span className="text-stone-400">-</span>
              <input type="number" placeholder="สูงสุด" className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-500 bg-stone-50" />
            </div>
            <button className="w-full mt-4 bg-stone-900 hover:bg-stone-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-sm">
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
            <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
              หมวดหมู่: {selectedCategory === 'ทั้งหมด' ? 'ทั้งหมด' : selectedCategory}
              {selectedCategory !== 'ทั้งหมด' && (
                <button onClick={() => setSelectedCategory('ทั้งหมด')} className="hover:text-rose-500"><X size={13} /></button>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-stone-600">
            <span>เรียงตาม:</span>
            <select className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 outline-none font-medium text-stone-800 cursor-pointer focus:border-amber-500">
              <option>สินค้าแนะนำ</option>
              <option>มาใหม่ล่าสุด</option>
              <option>ราคา: ต่ำไปสูง</option>
              <option>ราคา: สูงไปต่ำ</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6">
          {filteredProducts.map((prod) => (
            <Link href={`/product/${prod.id}`} key={prod.id} className="group cursor-pointer flex flex-col">
              <div className="bg-stone-100 aspect-[4/5] rounded-2xl mb-4 relative overflow-hidden shadow-sm">
                {prod.tag && (
                  <span className="absolute top-3 left-3 bg-white/95 text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-md z-10">
                    {prod.tag}
                  </span>
                )}
                <Image
                  src={prod.img}
                  alt={prod.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <h3 className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors text-base truncate">{prod.name}</h3>
              <p className="text-xs text-stone-400 mt-0.5">{prod.style}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-amber-700 font-bold text-lg">฿{prod.price}</span>
                <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">{prod.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
}
