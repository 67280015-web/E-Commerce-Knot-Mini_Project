"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ShieldCheck, CheckCircle, CreditCard, QrCode } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('ems');
  const [paymentMethod, setPaymentMethod] = useState('promptpay');

  const cartItems = useCartStore(state => state.items);
  const subtotal = useCartStore(state => state.getSubtotal());
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shippingCost = shippingMethod === 'ems' ? 50 : 35;
  const total = subtotal + shippingCost;

  const handleConfirmOrder = () => {
    setStep(4);
  };

  if (step === 4) {
    return (
      <div className="bg-stone-50 min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 max-w-lg w-full text-center mx-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">สั่งซื้อสำเร็จ!</h1>
          <p className="text-stone-500 mb-8">หมายเลขคำสั่งซื้อของคุณคือ <span className="font-bold text-stone-800">#KNT-{Math.floor(10000 + Math.random() * 90000)}</span><br/>เราได้ส่งรายละเอียดคำสั่งซื้อไปที่อีเมลของคุณแล้ว</p>
          
          <div className="bg-stone-50 p-6 rounded-2xl text-left mb-8">
            <h3 className="font-bold text-stone-800 mb-4 border-b border-stone-200 pb-2">สรุปรายการ ({cartItems.length} รายการ)</h3>
            <div className="flex justify-between text-sm text-stone-600 mb-2">
              <span>ยอดรวมทั้งหมด</span>
              <span className="font-bold text-amber-700 text-lg">฿{total}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-600">
              <span>วิธีชำระเงิน</span>
              <span className="font-medium text-stone-800">{paymentMethod === 'promptpay' ? 'QR PromptPay' : 'โอนเงินผ่านธนาคาร'}</span>
            </div>
          </div>

          <Link href="/account" className="block w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-stone-800 transition-colors mb-3">
            ดูสถานะคำสั่งซื้อ
          </Link>
          <button onClick={() => { clearCart(); window.location.href = '/'; }} className="block w-full bg-white border border-stone-300 text-stone-700 py-4 rounded-2xl font-bold hover:bg-stone-50 transition-colors">
            กลับหน้าแรก
          </button>
        </div>
      </div>
    );
  }

  // Redirect to cart if empty
  if (cartItems.length === 0) {
    return (
      <div className="bg-stone-50 min-h-screen py-16 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl border border-stone-100 shadow-sm max-w-md mx-4">
          <h2 className="text-2xl font-bold text-stone-800 mb-3">ไม่มีสินค้าที่ต้องชำระเงิน</h2>
          <p className="text-stone-500 mb-6 text-sm">กรุณาเลือกซื้อสินค้าและเพิ่มลงในตะกร้าก่อนดำเนินการชำระเงิน</p>
          <Link href="/shop" className="bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-700 transition-colors inline-block">
            กลับไปเลือกซื้อสินค้า
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left: Checkout Steps */}
        <div className="w-full lg:w-2/3">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-8">
            <Link href="/cart" className="hover:text-stone-800 transition-colors">ตะกร้าสินค้า</Link>
            <ChevronRight size={14} className="text-stone-300" />
            <span className={step >= 1 ? "text-stone-800 font-bold" : ""}>1. ที่อยู่จัดส่ง</span>
            <ChevronRight size={14} className="text-stone-300" />
            <span className={step >= 2 ? "text-stone-800 font-bold" : ""}>2. วิธีจัดส่ง</span>
            <ChevronRight size={14} className="text-stone-300" />
            <span className={step >= 3 ? "text-stone-800 font-bold" : ""}>3. ชำระเงิน</span>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden p-6 md:p-8 space-y-8">
            
            {/* Step 1: Contact & Address */}
            <div className={step !== 1 ? 'opacity-50 pointer-events-none' : ''}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 1 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'}`}>1</div>
                <h2 className="text-xl font-bold text-stone-800">ข้อมูลติดต่อและที่อยู่จัดส่ง</h2>
              </div>
              
              {step === 1 && (
                <div className="space-y-4 pl-11">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">อีเมล</label>
                      <input type="email" className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50 focus:bg-white transition-colors" placeholder="email@example.com" defaultValue="demo@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">เบอร์โทรศัพท์</label>
                      <input type="tel" className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50 focus:bg-white transition-colors" placeholder="08X-XXX-XXXX" defaultValue="081-234-5678" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">ชื่อจริง</label>
                      <input type="text" className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50 focus:bg-white transition-colors" defaultValue="นัชชา" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">นามสกุล</label>
                      <input type="text" className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50 focus:bg-white transition-colors" defaultValue="ใจดี" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">ที่อยู่ (บ้านเลขที่, ซอย, ถนน)</label>
                    <input type="text" className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50 focus:bg-white transition-colors" defaultValue="123/45 ซอยสุขุมวิท 63" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">จังหวัด</label>
                      <select className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50 focus:bg-white transition-colors">
                        <option>กรุงเทพมหานคร</option>
                        <option>เชียงใหม่</option>
                        <option>ขอนแก่น</option>
                        <option>ภูเก็ต</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">รหัสไปรษณีย์</label>
                      <input type="text" className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50 focus:bg-white transition-colors" defaultValue="10110" />
                    </div>
                  </div>

                  <button onClick={() => setStep(2)} className="mt-6 bg-stone-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-md">
                    ไปขั้นตอนการจัดส่ง
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Shipping Method */}
            <div className={step !== 2 ? 'opacity-50 pointer-events-none' : ''}>
              <div className="flex items-center gap-3 mb-6 border-t border-stone-100 pt-8">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 2 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'}`}>2</div>
                <h2 className="text-xl font-bold text-stone-800">วิธีจัดส่ง</h2>
              </div>
              
              {step === 2 && (
                <div className="space-y-4 pl-11">
                  <label className={`block border-2 rounded-2xl p-5 cursor-pointer transition-colors ${shippingMethod === 'ems' ? 'border-amber-700 bg-amber-50/60' : 'border-stone-200 hover:border-stone-300'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" checked={shippingMethod === 'ems'} onChange={() => setShippingMethod('ems')} className="w-4 h-4 accent-amber-700" />
                        <span className="font-bold text-stone-800">EMS ด่วนพิเศษ (1-2 วัน)</span>
                      </div>
                      <span className="font-bold text-amber-800">฿50</span>
                    </div>
                    <p className="text-xs text-stone-500 ml-7">จัดส่งรวดเร็ว มี Tracking ติดตามพัสดุได้ละเอียดทุกขั้นตอน</p>
                  </label>

                  <label className={`block border-2 rounded-2xl p-5 cursor-pointer transition-colors ${shippingMethod === 'reg' ? 'border-amber-700 bg-amber-50/60' : 'border-stone-200 hover:border-stone-300'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" checked={shippingMethod === 'reg'} onChange={() => setShippingMethod('reg')} className="w-4 h-4 accent-amber-700" />
                        <span className="font-bold text-stone-800">ลงทะเบียน (3-5 วัน)</span>
                      </div>
                      <span className="font-bold text-amber-800">฿35</span>
                    </div>
                    <p className="text-xs text-stone-500 ml-7">ประหยัดค่าส่ง เหมาะสำหรับคนรอได้</p>
                  </label>

                  <div className="flex gap-4 mt-6">
                    <button onClick={() => setStep(1)} className="px-6 py-3.5 rounded-xl font-bold text-stone-600 hover:bg-stone-100 transition-colors border border-stone-200">ย้อนกลับ</button>
                    <button onClick={() => setStep(3)} className="bg-stone-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-md">ไปขั้นตอนชำระเงิน</button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment */}
            <div className={step !== 3 ? 'opacity-50 pointer-events-none' : ''}>
              <div className="flex items-center gap-3 mb-6 border-t border-stone-100 pt-8">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 3 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'}`}>3</div>
                <h2 className="text-xl font-bold text-stone-800">ชำระเงิน</h2>
              </div>
              
              {step === 3 && (
                <div className="space-y-4 pl-11">
                  <label className={`block border-2 rounded-2xl p-5 cursor-pointer transition-colors ${paymentMethod === 'promptpay' ? 'border-amber-700 bg-amber-50/60' : 'border-stone-200 hover:border-stone-300'}`}>
                    <div className="flex items-center gap-3 mb-1">
                      <input type="radio" name="payment" checked={paymentMethod === 'promptpay'} onChange={() => setPaymentMethod('promptpay')} className="w-4 h-4 accent-amber-700" />
                      <QrCode size={20} className="text-stone-700" />
                      <span className="font-bold text-stone-800">QR PromptPay (สแกนจ่าย)</span>
                    </div>
                    {paymentMethod === 'promptpay' && (
                      <div className="ml-7 mt-4 bg-white p-5 rounded-2xl border border-stone-200 text-center max-w-xs mx-auto">
                        <div className="w-40 h-40 bg-stone-100 mx-auto mb-3 flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-300">
                          <QrCode size={48} className="text-stone-400 mb-1" />
                          <span className="text-xs text-stone-400 font-bold">QR PromptPay</span>
                          <span className="text-[10px] text-stone-400 font-mono mt-0.5">ยอดชำระ ฿{total}</span>
                        </div>
                        <p className="text-xs text-stone-500 font-medium">สแกนชำระผ่าน Mobile Banking ทุกธนาคาร</p>
                      </div>
                    )}
                  </label>

                  <label className={`block border-2 rounded-2xl p-5 cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-amber-700 bg-amber-50/60' : 'border-stone-200 hover:border-stone-300'}`}>
                    <div className="flex items-center gap-3 mb-1">
                      <input type="radio" name="payment" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="w-4 h-4 accent-amber-700" />
                      <CreditCard size={20} className="text-stone-700" />
                      <span className="font-bold text-stone-800">โอนเงินผ่านบัญชีธนาคาร</span>
                    </div>
                    {paymentMethod === 'bank' && (
                      <div className="ml-7 mt-4 bg-white p-5 rounded-2xl border border-stone-200 text-sm text-stone-600 space-y-2">
                        <p className="font-bold text-stone-800">ธนาคารกสิกรไทย (KBank)</p>
                        <p className="font-mono text-base font-bold text-stone-900">123-4-56789-0</p>
                        <p className="text-xs text-stone-500">ชื่อบัญชี: บจก. น็อตส์ แมคราเม่ (KNOTS Co., Ltd.)</p>
                        <div className="mt-4 pt-3 border-t border-stone-100">
                          <label className="block text-xs font-bold text-stone-800 mb-2">แนบสลิปโอนเงิน</label>
                          <input type="file" className="text-xs text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer" />
                        </div>
                      </div>
                    )}
                  </label>

                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep(2)} className="px-6 py-4 rounded-xl font-bold text-stone-600 hover:bg-stone-100 transition-colors border border-stone-200">ย้อนกลับ</button>
                    <button onClick={handleConfirmOrder} className="flex-1 bg-amber-700 text-white py-4 rounded-xl font-bold hover:bg-amber-800 transition-colors shadow-lg shadow-amber-700/20 text-lg">
                      ยืนยันคำสั่งซื้อ (฿{total})
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right: Order Summary (Sticky) */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 md:p-8 sticky top-24">
            <h2 className="text-lg font-bold text-stone-800 mb-6 border-b border-stone-100 pb-4">
              สรุปคำสั่งซื้อ ({cartItems.length} รายการ)
            </h2>
            
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-16 h-16 bg-stone-100 rounded-xl relative overflow-hidden flex-shrink-0 shadow-sm">
                    <Image
                      src={item.img || '/images/products/prod-1.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-800 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-stone-500 truncate">สี{item.color} • {item.hook}</p>
                    <p className="text-xs text-stone-400 mt-0.5">จำนวน: {item.qty} ชิ้น</p>
                  </div>
                  <div className="font-bold text-amber-800 text-sm flex-shrink-0">
                    ฿{item.price * item.qty}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm mb-6 border-t border-stone-100 pt-6">
              <div className="flex justify-between text-stone-600">
                <span>มูลค่าสินค้า</span>
                <span className="font-semibold text-stone-800">฿{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>ค่าจัดส่ง ({shippingMethod === 'ems' ? 'EMS' : 'ลงทะเบียน'})</span>
                <span className="font-semibold text-stone-800">฿{shippingCost}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-2 pt-6 border-t border-stone-100">
              <span className="font-bold text-stone-800 text-lg">ยอดรวมสุทธิ</span>
              <span className="font-bold text-amber-700 text-3xl">฿{total}</span>
            </div>
            
            <p className="text-xs text-stone-400 text-right mb-6">รวมภาษีมูลค่าเพิ่มแล้ว</p>
            
            <div className="flex items-center justify-center gap-2 text-xs text-stone-500 bg-stone-50 py-3 rounded-xl border border-stone-100">
              <ShieldCheck size={16} className="text-green-600"/> ชำระเงินปลอดภัยด้วย SSL 256-bit
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
