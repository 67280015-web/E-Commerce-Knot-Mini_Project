"use client";

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, Heart, Share, ShoppingBag, ChevronRight, ShieldCheck, Ruler, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { products } from '@/data/products';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  // Find product or fallback to first product
  const foundProduct = products.find(p => p.id === Number(id)) || products[0];

  const [activeImage, setActiveImage] = useState(foundProduct.img);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedHook, setSelectedHook] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [added, setAdded] = useState(false);

  const addItem = useCartStore(state => state.addItem);

  const colors = [
    { bg: 'bg-stone-100', name: 'ครีม' },
    { bg: 'bg-amber-700', name: 'น้ำตาล' },
    { bg: 'bg-stone-800', name: 'ดำ' },
    { bg: 'bg-rose-300', name: 'ชมพู' }
  ];
  const hooks = ['ตะขอก้ามปู', 'ห่วงกลม'];

  const handleAddToCart = () => {
    const colorObj = colors[selectedColor];
    const hookName = hooks[selectedHook];
    
    addItem({
      id: `${foundProduct.id}-${colorObj.name}-${hookName}`,
      productId: String(foundProduct.id),
      name: foundProduct.name,
      price: foundProduct.price,
      color: colorObj.name,
      hook: hookName,
      qty: quantity,
      img: foundProduct.img,
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-2 text-xs font-medium text-stone-500">
        <Link href="/" className="hover:text-stone-800 transition-colors">หน้าแรก</Link>
        <ChevronRight size={14} className="text-stone-300" />
        <Link href="/shop" className="hover:text-stone-800 transition-colors">สินค้าทั้งหมด</Link>
        <ChevronRight size={14} className="text-stone-300" />
        <span className="text-stone-800 truncate">{foundProduct.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row gap-10 md:gap-16">
        
        {/* Gallery Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-stone-100 aspect-[4/5] rounded-3xl relative overflow-hidden group shadow-md">
            <Image
              src={activeImage}
              alt={foundProduct.name}
              fill
              priority
              className="object-cover object-center transition-all duration-300"
            />
            {foundProduct.tag && (
              <span className="absolute top-4 left-4 bg-white/95 text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                {foundProduct.tag}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {foundProduct.gallery.map((imgSrc, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgSrc)}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all shadow-sm ${activeImage === imgSrc ? 'border-amber-700 ring-2 ring-amber-700/20 scale-102' : 'border-transparent hover:border-stone-300 opacity-70 hover:opacity-100'}`}
              >
                <Image
                  src={imgSrc}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info & Options */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs text-amber-700 font-semibold tracking-wider uppercase">{foundProduct.style}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mt-1">{foundProduct.name}</h1>
            </div>
            <button className="text-stone-400 hover:text-rose-500 transition-colors p-2.5 bg-stone-50 hover:bg-rose-50 rounded-full shadow-sm">
              <Heart size={22} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-3 mt-2">
            <span className="text-3xl font-bold text-stone-900">฿{foundProduct.price}</span>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">
              {foundProduct.status}
            </span>
          </div>

          <p className="text-stone-600 text-sm leading-relaxed mb-6">
            {foundProduct.description}
          </p>

          <div className="flex items-center gap-3 text-sm text-stone-600 mb-8 border-b border-stone-200 pb-6">
            <div className="flex text-amber-400 gap-0.5">
              <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
            </div>
            <span className="font-semibold underline decoration-stone-300 underline-offset-4 cursor-pointer hover:text-stone-900">24 รีวิว</span>
            <span className="text-stone-300">|</span>
            <button className="flex items-center gap-1.5 font-medium hover:text-stone-900"><Share size={14} /> แชร์</button>
          </div>

          {/* Options */}
          <div className="space-y-8 mb-10">
            {/* Color */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-stone-800">สีเชือก (Color)</h3>
                <span className="text-xs font-semibold text-amber-800">{colors[selectedColor].name}</span>
              </div>
              <div className="flex gap-3">
                {colors.map((color, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedColor(i)}
                    className={`w-11 h-11 rounded-full border-2 focus:outline-none transition-all ${color.bg} ${selectedColor === i ? 'border-amber-700 ring-2 ring-white ring-inset scale-110 shadow-md' : 'border-stone-300 hover:scale-105 shadow-sm'}`}
                    aria-label={color.name}
                  ></button>
                ))}
              </div>
            </div>

            {/* Hook Type */}
            <div>
              <h3 className="text-sm font-bold text-stone-800 mb-3">แบบตะขอ (Hook Type)</h3>
              <div className="flex flex-wrap gap-3">
                {hooks.map((hook, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedHook(i)}
                    className={`px-5 py-3 border rounded-xl text-sm font-bold transition-all ${selectedHook === i ? 'border-amber-700 bg-amber-50 text-amber-800 shadow-sm' : 'border-stone-300 text-stone-600 hover:border-stone-400 hover:bg-stone-50'}`}
                  >
                    {hook}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-bold text-stone-800 mb-3">จำนวน</h3>
              <div className="flex items-center border border-stone-300 rounded-xl w-fit bg-white shadow-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-2.5 text-stone-600 hover:bg-stone-100 rounded-l-xl transition-colors font-bold text-lg">-</button>
                <span className="w-12 text-center text-sm font-bold text-stone-800">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-2.5 text-stone-600 hover:bg-stone-100 rounded-r-xl transition-colors font-bold text-lg">+</button>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex gap-4 mb-10">
            <button 
              onClick={handleAddToCart}
              className={`flex-1 border-2 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-lg shadow-sm ${added ? 'bg-[#00B900] border-[#00B900] text-white' : 'bg-white border-stone-900 text-stone-900 hover:bg-stone-50'}`}
            >
              {added ? <ShieldCheck size={22} /> : <ShoppingBag size={22} />}
              {added ? 'เพิ่มลงตะกร้าแล้ว!' : 'เพิ่มลงตะกร้า'}
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-stone-900 hover:bg-amber-700 text-white py-4 rounded-2xl font-bold transition-colors text-lg shadow-lg shadow-stone-900/20">
              ซื้อทันที
            </button>
          </div>

          {/* Details Tabs */}
          <div className="border-t border-stone-200 pt-8 mt-auto">
             <div className="flex gap-8 mb-6 border-b border-stone-200">
              <button onClick={() => setActiveTab('details')} className={`pb-3 text-sm font-bold transition-colors ${activeTab === 'details' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700 border-b-2 border-transparent'}`}>รายละเอียดวัสดุ</button>
              <button onClick={() => setActiveTab('size')} className={`pb-3 text-sm font-bold transition-colors ${activeTab === 'size' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700 border-b-2 border-transparent'}`}>ขนาด</button>
              <button onClick={() => setActiveTab('care')} className={`pb-3 text-sm font-bold transition-colors ${activeTab === 'care' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700 border-b-2 border-transparent'}`}>วิธีดูแลรักษา</button>
            </div>
            <div className="text-sm text-stone-600 leading-relaxed min-h-[100px] bg-stone-50 p-5 rounded-2xl border border-stone-100">
              {activeTab === 'details' && <p className="flex items-start gap-3"><ShieldCheck size={20} className="text-amber-700 shrink-0 mt-0.5"/> เชือกคอตตอนธรรมชาติ 100% เกรดพรีเมียม สัมผัสนุ่ม ไม่ระคายเคือง แข็งแรงทนทาน ลายถักแน่นหนาด้วยความประณีต</p>}
              {activeTab === 'size' && <p className="flex items-start gap-3"><Ruler size={20} className="text-amber-700 shrink-0 mt-0.5"/> ความยาวรวมตะขอประมาณ 14 - 16 ซม. / ความกว้างลายถัก 2.5 ซม. (เนื่องจากเป็นงานถักมือ ขนาดอาจมีความแตกต่างเล็กน้อย)</p>}
              {activeTab === 'care' && <p className="flex items-start gap-3"><Sparkles size={20} className="text-amber-700 shrink-0 mt-0.5"/> หากเปื้อน สามารถใช้แปรงขนนุ่มจุ่มน้ำสบู่อ่อนๆ แปรงเบาๆ และผึ่งลมในที่ร่มให้แห้งสนิท หลีกเลี่ยงแสงแดดจัดและเครื่องซักผ้า</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 flex gap-3 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] pb-6">
        <button onClick={handleAddToCart} className={`w-14 h-14 flex items-center justify-center rounded-2xl border-2 transition-all active:scale-95 ${added ? 'bg-[#00B900] border-[#00B900] text-white' : 'border-stone-300 text-stone-700 bg-stone-50 hover:bg-stone-100'}`}>
          {added ? <ShieldCheck size={24} /> : <ShoppingBag size={24} />}
        </button>
        <button onClick={handleBuyNow} className="flex-1 bg-stone-900 hover:bg-amber-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-stone-900/20 active:scale-95 transition-all">
          ซื้อทันที (฿{foundProduct.price})
        </button>
      </div>
    </div>
  );
}
