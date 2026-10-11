"use client";

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, SlidersHorizontal, X, Search, RotateCcw, Sparkles, Gem, Gift, LayoutGrid } from 'lucide-react';
import { products, Product } from '@/data/products';

const COLOR_OPTIONS = [
  { name: 'ครีม', bg: 'bg-stone-100', border: 'border-stone-300' },
  { name: 'น้ำตาล', bg: 'bg-amber-700', border: 'border-amber-800' },
  { name: 'ดำ', bg: 'bg-stone-900', border: 'border-stone-900' },
  { name: 'ฟ้า', bg: 'bg-sky-200', border: 'border-sky-300' },
  { name: 'เขียว', bg: 'bg-emerald-700', border: 'border-emerald-800' },
  { name: 'ชมพู', bg: 'bg-rose-300', border: 'border-rose-400' },
  { name: 'ส้ม', bg: 'bg-orange-300', border: 'border-orange-400' },
  { name: 'ม่วง', bg: 'bg-purple-300', border: 'border-purple-400' },
];

const CATEGORY_DETAILS: Record<string, {
  title: string;
  enTitle: string;
  badge: string;
  icon?: any;
  desc: string;
  bannerImg: string;
}> = {
  'ทั้งหมด': {
    title: 'สินค้าทั้งหมด',
    enTitle: 'All Collections',
    badge: '100% Handcrafted',
    icon: LayoutGrid,
    desc: 'พวงกุญแจถักแมคราเม่แฮนด์เมดทุกแบบ ทุกสไตล์ คัดสรรเส้นเชือกคอตตอนธรรมชาติคุณภาพสูง ถักทอด้วยความประณีต',
    bannerImg: '/images/products/prod-1.jpg',
  },
  'สไตล์มินิมอล': {
    title: 'สไตล์มินิมอล',
    enTitle: 'Minimalist Style',
    badge: 'Simple & Earthy',
    icon: Sparkles,
    desc: 'ความเรียบง่ายที่ลงตัว ลายถักคลาสสิกโทนสีธรรมชาติ (เอิร์ธโทน) เบาสบาย แมทช์ง่ายกับกระเป๋าทุกใบในชีวิตประจำวัน',
    bannerImg: '/images/products/prod-2.jpg',
  },
  'สไตล์เครื่องราง': {
    title: 'สไตล์เครื่องราง',
    enTitle: 'Lucky Charms & Stones',
    badge: 'Spiritual & Gemstones',
    icon: Gem,
    desc: 'เสริมพลังบวก ความมั่นใจ และความโชคดีในทุกก้าวเดิน ด้วยหินมงคลแท้ธรรมชาติ (โรสควอตซ์, หยก, นิลดำ) ผสานลายถักอันเป็นเอกลักษณ์',
    bannerImg: '/images/products/prod-3.jpg',
  },
  'เซ็ตของขวัญ': {
    title: 'เซ็ตของขวัญ',
    enTitle: 'Gift Sets & Bundles',
    badge: 'Special Occasions',
    icon: Gift,
    desc: 'ส่งมอบความอบอุ่นและความประทับใจให้คนสำคัญ ด้วยเซ็ตพวงกุญแจพร้อมแพ็กเกจกล่องของขวัญและการ์ดอวยพรสุดพิเศษ',
    bannerImg: '/images/products/prod-4.jpg',
  },
};

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedHook, setSelectedHook] = useState<string | null>(null);
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | null>(null);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recommended' | 'newest' | 'price-asc' | 'price-desc'>('recommended');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync from URL query parameters
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchTerm(q);

    const style = searchParams.get('style');
    if (style === 'minimal' || style === 'มินิมอล') {
      setSelectedCategory('สไตล์มินิมอล');
    } else if (style === 'charm' || style === 'เครื่องราง') {
      setSelectedCategory('สไตล์เครื่องราง');
    }

    const cat = searchParams.get('category');
    if (cat === 'giftset' || cat === 'ของขวัญ') {
      setSelectedCategory('เซ็ตของขวัญ');
    }
  }, [searchParams]);

  // Handle category switch
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'สไตล์มินิมอล') {
      router.replace('/shop?style=minimal', { scroll: false });
    } else if (cat === 'สไตล์เครื่องราง') {
      router.replace('/shop?style=charm', { scroll: false });
    } else if (cat === 'เซ็ตของขวัญ') {
      router.replace('/shop?category=giftset', { scroll: false });
    } else {
      router.replace('/shop', { scroll: false });
    }
  };

  // Handle status toggle
  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  // Handle price filter apply
  const handleApplyPrice = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedMinPrice(minPriceInput ? Number(minPriceInput) : null);
    setAppliedMaxPrice(maxPriceInput ? Number(maxPriceInput) : null);
  };

  // Reset all filters
  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ทั้งหมด');
    setSelectedStatuses([]);
    setSelectedColor(null);
    setSelectedHook(null);
    setMinPriceInput('');
    setMaxPriceInput('');
    setAppliedMinPrice(null);
    setAppliedMaxPrice(null);
    setSortBy('recommended');
    router.replace('/shop', { scroll: false });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p: Product) => {
      // 1. Search keyword
      if (searchTerm.trim()) {
        const query = searchTerm.trim().toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesStyle = p.style.toLowerCase().includes(query);
        const matchesTag = p.tag ? p.tag.toLowerCase().includes(query) : false;
        const matchesColors = p.colors ? p.colors.some(c => c.toLowerCase().includes(query)) : false;
        if (!matchesName && !matchesDesc && !matchesStyle && !matchesTag && !matchesColors) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'ทั้งหมด' && p.style !== selectedCategory) {
        return false;
      }

      // 3. Status
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(p.status)) {
        return false;
      }

      // 4. Color
      if (selectedColor && (!p.colors || !p.colors.includes(selectedColor))) {
        return false;
      }

      // 5. Hook Type
      if (selectedHook && (!p.hooks || !p.hooks.includes(selectedHook))) {
        return false;
      }

      // 6. Price range
      if (appliedMinPrice !== null && p.price < appliedMinPrice) {
        return false;
      }
      if (appliedMaxPrice !== null && p.price > appliedMaxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.id - a.id;
      return 0; // recommended
    });
  }, [searchTerm, selectedCategory, selectedStatuses, selectedColor, selectedHook, appliedMinPrice, appliedMaxPrice, sortBy]);

  // Active filter count
  const hasActiveFilters = 
    Boolean(searchTerm.trim()) || 
    selectedCategory !== 'ทั้งหมด' || 
    selectedStatuses.length > 0 || 
    selectedColor !== null || 
    selectedHook !== null || 
    appliedMinPrice !== null || 
    appliedMaxPrice !== null;

  const currentCategoryDetail = CATEGORY_DETAILS[selectedCategory] || CATEGORY_DETAILS['ทั้งหมด'];

  return (
    <div className="min-h-screen bg-stone-50/50 pb-20">
      
      {/* Dynamic Collection Hero Banner */}
      <section className="relative h-64 sm:h-72 md:h-80 bg-stone-900 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={currentCategoryDetail.bannerImg}
            alt={currentCategoryDetail.title}
            fill
            priority
            className="object-cover object-center brightness-50 transition-all duration-700 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-3.5 py-1 bg-amber-500/25 border border-amber-400/30 text-amber-300 text-xs font-bold rounded-full uppercase tracking-wider mb-3 backdrop-blur-sm">
              {currentCategoryDetail.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
              {currentCategoryDetail.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-normal mt-2.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
              {currentCategoryDetail.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Category Quick Navigation Bar */}
      <section className="bg-white border-b border-stone-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'ทั้งหมด', label: 'สินค้าทั้งหมด', icon: LayoutGrid },
              { id: 'สไตล์มินิมอล', label: 'สไตล์มินิมอล', icon: Sparkles },
              { id: 'สไตล์เครื่องราง', label: 'สไตล์เครื่องราง', icon: Gem },
              { id: 'เซ็ตของขวัญ', label: 'เซ็ตของขวัญ', icon: Gift },
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-md shadow-stone-900/15'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900'
                  }`}
                >
                  <Icon size={15} className={isSelected ? 'text-amber-400' : 'text-stone-500'} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Layout Area */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Toggle & Search */}
        <div className="md:hidden flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-stone-800">
              พบ {filteredProducts.length} รายการ
            </span>
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 border border-stone-300 px-4 py-2 rounded-full text-xs font-bold text-stone-700 bg-white shadow-xs"
            >
              <SlidersHorizontal size={14} /> ตัวกรอง {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-amber-600" />}
            </button>
          </div>

          <div className="relative">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาชื่อ, สี, ลาย..."
              className="w-full bg-white border border-stone-200 rounded-2xl pl-10 pr-10 py-2.5 text-sm outline-none focus:border-amber-700 shadow-2xs"
            />
            <Search size={16} className="absolute left-3.5 top-3.5 text-stone-400" />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3.5 top-3 text-stone-400 p-0.5">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden'} md:block`}>
          <div className="sticky top-32 space-y-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
            
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-stone-900">ตัวกรองสินค้า</h2>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  <RotateCcw size={12} /> รีเซ็ต
                </button>
              )}
            </div>

            {/* Search Input in Sidebar */}
            <div className="hidden md:block">
              <h3 className="font-bold text-stone-900 mb-2.5 text-xs uppercase tracking-wider text-stone-500">ค้นหา</h3>
              <div className="relative">
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ค้นหาชื่อ, สี, ลาย..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-8 py-2 text-sm outline-none focus:border-amber-700 focus:bg-white transition-colors"
                />
                <Search size={15} className="absolute left-3 top-2.5 text-stone-400" />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="border-t border-stone-100 pt-5">
              <h3 className="font-bold text-stone-900 mb-3 text-xs uppercase tracking-wider text-stone-500">หมวดหมู่สไตล์</h3>
              <ul className="space-y-2 text-sm">
                {['ทั้งหมด', 'สไตล์มินิมอล', 'สไตล์เครื่องราง', 'เซ็ตของขวัญ'].map((cat) => (
                  <li key={cat}>
                    <button 
                      onClick={() => handleSelectCategory(cat)}
                      className={`w-full text-left py-1.5 px-3 rounded-xl transition-all font-medium flex justify-between items-center ${
                        selectedCategory === cat 
                          ? 'bg-amber-50 text-amber-900 font-bold' 
                          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                    >
                      <span>{cat === 'ทั้งหมด' ? 'ทั้งหมด' : cat}</span>
                      <span className="text-xs text-stone-400 font-normal">
                        ({cat === 'ทั้งหมด' ? products.length : products.filter(p => p.style === cat).length})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Filter */}
            <div className="border-t border-stone-100 pt-5">
              <h3 className="font-bold text-stone-900 mb-3 text-xs uppercase tracking-wider text-stone-500">สถานะจัดส่ง</h3>
              <ul className="space-y-2.5 text-sm text-stone-600">
                {['พร้อมส่ง', 'สั่งทำ 3-5 วัน'].map((st) => (
                  <li key={st}>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-amber-700 font-medium">
                      <input 
                        type="checkbox" 
                        className="accent-amber-700 w-4 h-4 rounded border-stone-300 cursor-pointer" 
                        checked={selectedStatuses.includes(st)}
                        onChange={() => toggleStatus(st)}
                      /> 
                      {st}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Filter */}
            <div className="border-t border-stone-100 pt-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider text-stone-500">สีเชือก</h3>
                {selectedColor && (
                  <button onClick={() => setSelectedColor(null)} className="text-xs text-amber-700 hover:underline">
                    ล้าง
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button 
                      key={c.name}
                      onClick={() => setSelectedColor(isSelected ? null : c.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                        isSelected 
                          ? 'border-amber-700 bg-amber-50 text-amber-900 shadow-2xs' 
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${c.bg} ${c.border} border shrink-0`} />
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hook Filter */}
            <div className="border-t border-stone-100 pt-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider text-stone-500">แบบตะขอ</h3>
                {selectedHook && (
                  <button onClick={() => setSelectedHook(null)} className="text-xs text-amber-700 hover:underline">
                    ล้าง
                  </button>
                )}
              </div>
              <div className="space-y-2 text-sm text-stone-600">
                {['ตะขอก้ามปู', 'ห่วงกลม'].map((hk) => (
                  <label key={hk} className="flex items-center gap-3 cursor-pointer hover:text-amber-700 font-medium">
                    <input 
                      type="checkbox" 
                      className="accent-amber-700 w-4 h-4 rounded border-stone-300 cursor-pointer" 
                      checked={selectedHook === hk}
                      onChange={() => setSelectedHook(selectedHook === hk ? null : hk)}
                    /> 
                    {hk}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-t border-stone-100 pt-5">
              <h3 className="font-bold text-stone-900 mb-3 text-xs uppercase tracking-wider text-stone-500">ช่วงราคา (฿)</h3>
              <form onSubmit={handleApplyPrice} className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    placeholder="ต่ำสุด" 
                    className="w-full border border-stone-200 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-amber-700 bg-stone-50 focus:bg-white" 
                  />
                  <span className="text-stone-400 text-xs">-</span>
                  <input 
                    type="number" 
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    placeholder="สูงสุด" 
                    className="w-full border border-stone-200 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-amber-700 bg-stone-50 focus:bg-white" 
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button 
                    type="submit"
                    className="flex-1 bg-stone-900 hover:bg-amber-700 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-2xs"
                  >
                    ใช้ตัวกรอง
                  </button>
                  {(appliedMinPrice !== null || appliedMaxPrice !== null) && (
                    <button 
                      type="button"
                      onClick={() => {
                        setMinPriceInput('');
                        setMaxPriceInput('');
                        setAppliedMinPrice(null);
                        setAppliedMaxPrice(null);
                      }}
                      className="px-3 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
                    >
                      ล้าง
                    </button>
                  )}
                </div>
              </form>
            </div>

          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1">
          {/* Active Filter Badges & Sort Menu */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-stone-200">
            {/* Active Pills */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1">
                แสดงผล {filteredProducts.length} ชิ้น
              </span>
              {searchTerm && (
                <span className="bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                  ค้นหา: "{searchTerm}" 
                  <button onClick={() => setSearchTerm('')} className="hover:text-rose-600"><X size={13} /></button>
                </span>
              )}
              {selectedStatuses.map((st) => (
                <span key={st} className="bg-stone-100 text-stone-800 border border-stone-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  {st} 
                  <button onClick={() => toggleStatus(st)} className="hover:text-rose-600"><X size={13} /></button>
                </span>
              ))}
              {selectedColor && (
                <span className="bg-stone-100 text-stone-800 border border-stone-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  สี: {selectedColor} 
                  <button onClick={() => setSelectedColor(null)} className="hover:text-rose-600"><X size={13} /></button>
                </span>
              )}
              {selectedHook && (
                <span className="bg-stone-100 text-stone-800 border border-stone-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  ตะขอ: {selectedHook} 
                  <button onClick={() => setSelectedHook(null)} className="hover:text-rose-600"><X size={13} /></button>
                </span>
              )}
              {(appliedMinPrice !== null || appliedMaxPrice !== null) && (
                <span className="bg-stone-100 text-stone-800 border border-stone-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  ราคา: {appliedMinPrice || 0} - {appliedMaxPrice || '∞'} ฿
                  <button onClick={() => { setAppliedMinPrice(null); setAppliedMaxPrice(null); setMinPriceInput(''); setMaxPriceInput(''); }} className="hover:text-rose-600"><X size={13} /></button>
                </span>
              )}
              {hasActiveFilters && (
                <button 
                  onClick={resetAllFilters}
                  className="text-xs text-amber-800 font-bold hover:underline ml-1"
                >
                  ล้างตัวกรอง
                </button>
              )}
            </div>

            {/* Sort Menu */}
            <div className="flex items-center gap-2 text-sm text-stone-600 shrink-0 ml-auto sm:ml-0">
              <span className="text-xs text-stone-500 font-medium">เรียงตาม:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 outline-none font-bold text-xs text-stone-800 cursor-pointer focus:border-amber-700 shadow-2xs"
              >
                <option value="recommended">สินค้าแนะนำ</option>
                <option value="newest">มาใหม่ล่าสุด</option>
                <option value="price-asc">ราคา: ต่ำไปสูง</option>
                <option value="price-desc">ราคา: สูงไปต่ำ</option>
              </select>
            </div>
          </div>

          {/* Product Grid or No Results */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-stone-200 shadow-sm max-w-lg mx-auto my-12">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🔍
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">ไม่พบสินค้าในหมวดนี้</h3>
              <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                ไม่พบสินค้าที่ตรงกับเงื่อนไข ลองเลือกดูสไตล์อื่นหรือล้างตัวกรองเพื่อดูสินค้าทั้งหมด
              </p>
              <button 
                onClick={resetAllFilters}
                className="bg-stone-900 hover:bg-amber-700 text-white px-6 py-3 rounded-full text-sm font-bold transition-colors shadow-md"
              >
                ดูสินค้าทั้งหมด
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6">
              {filteredProducts.map((prod) => (
                <Link href={`/product/${prod.id}`} key={prod.id} className="group cursor-pointer flex flex-col">
                  <div className="bg-stone-100 aspect-[4/5] rounded-3xl mb-4 relative overflow-hidden shadow-sm">
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
                  <div className="flex flex-col flex-1">
                    <span className="text-[11px] text-amber-700 font-semibold uppercase tracking-wider">{prod.style}</span>
                    <h3 className="font-bold text-stone-900 group-hover:text-amber-700 transition-colors text-base truncate mt-0.5">{prod.name}</h3>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-1">{prod.description}</p>
                    
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-stone-100">
                      <span className="text-amber-700 font-bold text-lg">฿{prod.price}</span>
                      <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">{prod.status}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-stone-400">กำลังโหลดสินค้า...</div>}>
      <ShopContent />
    </Suspense>
  );
}
