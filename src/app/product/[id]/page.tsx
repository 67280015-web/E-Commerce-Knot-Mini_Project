"use client";

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Heart, Share, ShoppingBag, ChevronRight, ShieldCheck, Ruler, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const router = useRouter();
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

  const productData = {
    id: id,
    name: 'Minimal Knot',
    price: 190,
  };

  const handleAddToCart = () => {
    const colorObj = colors[selectedColor];
    const hookName = hooks[selectedHook];
    
    addItem({
      id: `${productData.id}-${colorObj.name}-${hookName}`,
      productId: productData.id,
      name: productData.name,
      price: productData.price,
      color: colorObj.name,
      hook: hookName,
      qty: quantity,
      img: 'ภาพจำลอง'
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
        <span className="text-stone-800 truncate">{productData.name} (รหัส {productData.id})</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row gap-10 md:gap-16">
        
        {/* Gallery Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-stone-100 aspect-[4/5] rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-zoom-in">
            <span className="text-stone-400">รูปสินค้าหลัก (แกลเลอรีซูมลายถัก)</span>
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-medium text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              คลิกเพื่อซูม
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`bg-stone-100 aspect-square rounded-2xl flex items-center justify-center cursor-pointer border-2 transition-all ${item === 1 ? 'border-amber-600 shadow-sm' : 'border-transparent hover:border-stone-300'}`}>
                <span className="text-stone-400 text-xs">รูป {item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info & Options */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800">{productData.name}</h1>
            <button className="text-stone-400 hover:text-rose-500 transition-colors p-2 bg-stone-50 rounded-full"><Heart size={22} /></button>
          </div>
          
          <div className="flex items-center gap-4 mb-4 mt-2">
            <span className="text-3xl font-semibold text-stone-900">฿{productData.price}</span>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">สั่งทำ 3-5 วัน</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-stone-600 mb-8 border-b border-stone-200 pb-6">
            <div className="flex text-amber-400 gap-0.5">
              <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
            </div>
            <span className="font-medium underline decoration-stone-300 underline-offset-4 cursor-pointer hover:text-stone-900">24 รีวิว</span>
            <span className="text-stone-300">|</span>
            <button className="flex items-center gap-1.5 font-medium hover:text-stone-900"><Share size={14} /> แชร์</button>
          </div>

          {/* Options */}
          <div className="space-y-8 mb-10">
            {/* Color */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-stone-800">สีเชือก (Color)</h3>
                <span className="text-xs font-medium text-stone-500">{colors[selectedColor].name}</span>
              </div>
              <div className="flex gap-3">
                {colors.map((color, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedColor(i)}
                    className={`w-11 h-11 rounded-full border-2 focus:outline-none transition-all ${color.bg} ${selectedColor === i ? 'border-amber-600 ring-2 ring-white ring-inset scale-110 shadow-md' : 'border-stone-200 hover:scale-105 shadow-sm'}`}
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
                    className={`px-5 py-3 border rounded-xl text-sm font-semibold transition-colors ${selectedHook === i ? 'border-amber-600 bg-amber-50 text-amber-800' : 'border-stone-300 text-stone-600 hover:border-stone-400 hover:bg-stone-50'}`}
                  >
                    {hook}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-bold text-stone-800 mb-3">จำนวน</h3>
              <div className="flex items-center border border-stone-300 rounded-xl w-fit bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-2.5 text-stone-600 hover:bg-stone-100 rounded-l-xl transition-colors font-medium">-</button>
                <span className="w-12 text-center text-sm font-bold text-stone-800">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-2.5 text-stone-600 hover:bg-stone-100 rounded-r-xl transition-colors font-medium">+</button>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex gap-4 mb-10">
            <button 
              onClick={handleAddToCart}
              className={`flex-1 border-2 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-lg ${added ? 'bg-[#00B900] border-[#00B900] text-white' : 'bg-white border-stone-900 text-stone-900 hover:bg-stone-50'}`}
            >
              {added ? <ShieldCheck size={22} /> : <ShoppingBag size={22} />}
              {added ? 'เพิ่มลงตะกร้าแล้ว' : 'เพิ่มลงตะกร้า'}
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-stone-900 hover:bg-amber-700 text-white py-4 rounded-2xl font-bold transition-colors text-lg shadow-lg shadow-stone-900/20">
              ซื้อทันที
            </button>
          </div>

          {/* Details */}
          <div className="border-t border-stone-200 pt-8 mt-auto">
             <div className="flex gap-8 mb-6 border-b border-stone-200">
              <button onClick={() => setActiveTab('details')} className={`pb-3 text-sm font-bold transition-colors ${activeTab === 'details' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700 border-b-2 border-transparent'}`}>รายละเอียดวัสดุ</button>
              <button onClick={() => setActiveTab('size')} className={`pb-3 text-sm font-bold transition-colors ${activeTab === 'size' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700 border-b-2 border-transparent'}`}>ขนาด</button>
              <button onClick={() => setActiveTab('care')} className={`pb-3 text-sm font-bold transition-colors ${activeTab === 'care' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700 border-b-2 border-transparent'}`}>วิธีดูแลรักษา</button>
            </div>
            <div className="text-sm text-stone-600 leading-relaxed min-h-[100px] bg-stone-50 p-5 rounded-2xl">
              {activeTab === 'details' && <p className="flex items-start gap-3"><ShieldCheck size={20} className="text-amber-600 shrink-0"/> เชือกคอตตอน 100% เกรดพรีเมียม สัมผัสนุ่ม ไม่ระคายเคือง แข็งแรงทนทาน ถักด้วยความประณีตทุกลาย</p>}
              {activeTab === 'size' && <p className="flex items-start gap-3"><Ruler size={20} className="text-amber-600 shrink-0"/> ความยาวรวมตะขอประมาณ 15 ซม. / ความกว้างลายถัก 2.5 ซม. (เนื่องจากเป็นงานแฮนด์เมด ขนาดอาจคลาดเคลื่อนเล็กน้อย)</p>}
              {activeTab === 'care' && <p className="flex items-start gap-3"><Sparkles size={20} className="text-amber-600 shrink-0"/> หากเปื้อน สามารถใช้แปรงขนอ่อนจุ่มสบู่อ่อนๆ แปรงเบาๆ และตากในที่ร่มให้แห้งสนิท ห้ามใช้สารฟอกขาว</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 flex gap-3 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-6">
        <button onClick={handleAddToCart} className={`w-14 h-14 flex items-center justify-center rounded-2xl border-2 transition-all active:scale-95 ${added ? 'bg-[#00B900] border-[#00B900] text-white' : 'border-stone-200 text-stone-600 bg-stone-50 hover:bg-stone-100'}`}>
          {added ? <ShieldCheck size={24} /> : <ShoppingBag size={24} />}
        </button>
        <button onClick={handleBuyNow} className="flex-1 bg-stone-900 hover:bg-amber-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-stone-900/20 active:scale-95 transition-all">
          ซื้อทันที (฿190)
        </button>
      </div>
    </div>
  );
}
