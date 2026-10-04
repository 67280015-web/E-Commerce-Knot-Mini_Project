"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, ChevronRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore(state => state.items);
  const updateQty = useCartStore(state => state.updateQty);
  const removeItem = useCartStore(state => state.removeItem);
  const subtotal = useCartStore(state => state.getSubtotal());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-stone-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-800 transition-colors">หน้าแรก</Link>
          <ChevronRight size={14} className="text-stone-300" />
          <span className="text-stone-800">ตะกร้าสินค้า</span>
        </div>

        <h1 className="text-3xl font-bold text-stone-800 mb-8">ตะกร้าสินค้าของคุณ {cartItems.length > 0 && <span className="text-stone-400 font-medium text-xl">({cartItems.length} รายการ)</span>}</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl shadow-sm text-center border border-stone-100">
            <h2 className="text-2xl font-semibold text-stone-800 mb-4">ตะกร้าสินค้าว่างเปล่า</h2>
            <p className="text-stone-500 mb-8">ยังไม่มีสินค้าในตะกร้า ลองดูสินค้าสไตล์มินิมอลของเราไหมคะ?</p>
            <Link href="/shop" className="bg-stone-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-stone-800 transition-colors inline-block">
              ไปช้อปปิ้งกันเลย
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Cart Items */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-stone-100 text-sm font-bold text-stone-500">
                  <div className="col-span-6">สินค้า</div>
                  <div className="col-span-3 text-center">ราคา</div>
                  <div className="col-span-3 text-center">จำนวน</div>
                </div>

                <div className="divide-y divide-stone-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
                      {/* Product details */}
                      <div className="col-span-6 flex gap-4 w-full">
                        <div className="w-24 h-24 bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-stone-400">ภาพสินค้า</span>
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="font-bold text-stone-800 text-base md:text-lg mb-1"><Link href={`/product/${item.productId}`} className="hover:text-amber-700">{item.name}</Link></h3>
                          <p className="text-xs text-stone-500 mb-0.5">สี: {item.color}</p>
                          <p className="text-xs text-stone-500">ตะขอ: {item.hook}</p>
                          {/* Mobile price and remove */}
                          <div className="flex items-center justify-between mt-3 md:hidden">
                            <span className="font-bold text-stone-900">฿{item.price}</span>
                            <button onClick={() => removeItem(item.id)} className="text-stone-400 hover:text-rose-500 text-xs flex items-center gap-1"><Trash2 size={14}/> ลบ</button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Price */}
                      <div className="col-span-3 hidden md:flex items-center justify-center font-bold text-stone-900 text-lg">
                        ฿{item.price}
                      </div>

                      {/* Quantity & Desktop Remove */}
                      <div className="col-span-3 flex md:flex-col items-center justify-between md:justify-center gap-3 w-full md:w-auto">
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 rounded-l-lg transition-colors">-</button>
                          <span className="w-8 text-center text-sm font-bold text-stone-800">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 rounded-r-lg transition-colors">+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="hidden md:flex text-stone-400 hover:text-rose-500 text-xs items-center gap-1 transition-colors">
                          <Trash2 size={14}/> ลบออก
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link href="/shop" className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-2 text-sm transition-colors">
                  <ArrowLeft size={16} /> ซื้อสินค้าเพิ่มเติม
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 md:p-8 sticky top-24">
                <h2 className="text-xl font-bold text-stone-800 mb-6">สรุปคำสั่งซื้อ</h2>
                
                <div className="space-y-4 text-sm mb-6 border-b border-stone-100 pb-6">
                  <div className="flex justify-between text-stone-600">
                    <span>มูลค่าสินค้า ({cartItems.length} รายการ)</span>
                    <span className="font-semibold text-stone-800">฿{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>ส่วนลด</span>
                    <span className="font-semibold text-stone-800">-</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>ค่าจัดส่ง</span>
                    <span className="text-xs text-stone-400 italic">คำนวณในขั้นตอนถัดไป</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="font-bold text-stone-800 text-lg">ยอดรวมสุทธิ</span>
                  <div className="text-right">
                    <span className="font-bold text-stone-900 text-3xl">฿{subtotal}</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full block text-center bg-stone-900 hover:bg-amber-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-stone-900/20 transition-all mb-4">
                  ดำเนินการชำระเงิน
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
                  <ShieldCheck size={16} className="text-green-600"/> ชำระเงินปลอดภัย 100%
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
