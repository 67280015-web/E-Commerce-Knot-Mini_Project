"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Package, Heart, MapPin, User, LogOut, ChevronRight, FileText, CheckCircle2, Clock } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', name: 'ประวัติการสั่งซื้อ', icon: Package },
    { id: 'wishlist', name: 'สินค้าที่ชอบ (Wishlist)', icon: Heart },
    { id: 'address', name: 'สมุดที่อยู่', icon: MapPin },
    { id: 'profile', name: 'บัญชีของฉัน', icon: User },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800">บัญชีของฉัน</h1>
          <p className="text-stone-500 mt-1">ยินดีต้อนรับ, คุณนัชชา</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-4 sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${isActive ? 'bg-stone-900 text-white shadow-md' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}`}
                    >
                      <Icon size={18} className={isActive ? "text-amber-500" : "text-stone-400"} />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
              <div className="mt-8 pt-4 border-t border-stone-100">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-stone-500 hover:bg-rose-50 hover:text-rose-600 transition-colors text-sm">
                  <LogOut size={18} /> ออกจากระบบ
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-stone-800 mb-2">คำสั่งซื้อล่าสุด</h2>
                
                {/* Active Order Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-stone-100 pb-4 gap-4">
                    <div>
                      <p className="text-sm text-stone-500 mb-1">คำสั่งซื้อ #KNT-84920</p>
                      <p className="text-xs text-stone-400">วันที่ 14 ต.ค. 2026</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-stone-200 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-2">
                        <FileText size={16}/> ใบกำกับภาษี
                      </button>
                    </div>
                  </div>

                  {/* Order Tracking */}
                  <div className="mb-10 px-2 md:px-8">
                    <h3 className="text-sm font-bold text-stone-800 mb-6">สถานะการจัดส่ง (Custom Order)</h3>
                    <div className="relative flex justify-between items-center text-xs md:text-sm font-medium">
                      <div className="absolute top-4 left-0 w-full h-1 bg-stone-100 -z-10"></div>
                      {/* Active Progress Bar */}
                      <div className="absolute top-4 left-0 w-[50%] h-1 bg-amber-500 -z-10"></div>
                      
                      {/* Steps */}
                      <div className="flex flex-col items-center gap-2 text-amber-600">
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md"><CheckCircle2 size={16}/></div>
                        <span>รับออเดอร์</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 text-amber-600">
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md"><CheckCircle2 size={16}/></div>
                        <span>กำลังถัก</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 text-amber-600">
                        <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-500 text-amber-600 flex items-center justify-center"><Clock size={16}/></div>
                        <span>QC ตรวจสอบ</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 text-stone-400">
                        <div className="w-8 h-8 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center">4</div>
                        <span>แพ็คสินค้า</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 text-stone-400">
                        <div className="w-8 h-8 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center">5</div>
                        <span>จัดส่งแล้ว</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-stone-100 rounded-xl flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-bold text-stone-800">Daisy Dream (Custom)</h4>
                        <p className="text-sm text-stone-500">สีครีม-ชมพู • ตะขอก้ามปู • จี้: LOVE</p>
                        <p className="text-sm font-semibold text-stone-800 mt-1">฿250 <span className="text-xs text-stone-400 font-normal">x 1</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Past Order */}
                <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 md:p-8 opacity-75">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm font-bold text-stone-800">#KNT-77102 <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-2">จัดส่งสำเร็จ</span></p>
                      <p className="text-xs text-stone-400 mt-1">20 ส.ค. 2026</p>
                    </div>
                    <button className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors">
                      สั่งซื้ออีกครั้ง (Reorder)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-bold text-stone-800 mb-6">สินค้าที่ชอบ</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 group relative">
                      <button className="absolute top-6 right-6 z-10 text-rose-500 hover:text-rose-600 bg-white p-1.5 rounded-full shadow-sm"><Heart size={16} fill="currentColor" /></button>
                      <div className="bg-stone-100 aspect-[4/5] rounded-xl mb-3 overflow-hidden"></div>
                      <h3 className="font-semibold text-stone-800 text-sm">Minimal Knot {item}</h3>
                      <p className="text-stone-900 font-bold text-sm mt-1 mb-3">฿190</p>
                      <button className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition-colors">เพิ่มลงตะกร้า</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Address Tab */}
            {activeTab === 'address' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-stone-800">สมุดที่อยู่</h2>
                  <button className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors">เพิ่มที่อยู่ใหม่</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-amber-500 relative">
                    <span className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">ค่าเริ่มต้น</span>
                    <h3 className="font-bold text-stone-800 mb-2">นัชชา ใจดี</h3>
                    <p className="text-sm text-stone-600 mb-1">123/45 ซ.สุขุมวิท 63 ถนนเอกมัย</p>
                    <p className="text-sm text-stone-600 mb-1">แขวงคลองตันเหนือ เขตวัฒนา</p>
                    <p className="text-sm text-stone-600 mb-4">กรุงเทพมหานคร 10110</p>
                    <p className="text-sm text-stone-600 font-medium">โทร: 081-234-5678</p>
                    <div className="mt-4 flex gap-3 text-sm font-semibold">
                      <button className="text-amber-600 hover:text-amber-700">แก้ไข</button>
                      <button className="text-stone-400 hover:text-rose-500">ลบ</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-stone-800 mb-6">ข้อมูลส่วนตัว</h2>
                <div className="space-y-4 max-w-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">ชื่อจริง</label>
                      <input type="text" defaultValue="นัชชา" className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">นามสกุล</label>
                      <input type="text" defaultValue="ใจดี" className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">อีเมล</label>
                    <input type="email" defaultValue="natcha@example.com" disabled className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-500 bg-stone-100 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">เบอร์โทรศัพท์</label>
                    <input type="tel" defaultValue="081-234-5678" className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50" />
                  </div>
                  <button className="mt-4 px-8 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors">
                    บันทึกการเปลี่ยนแปลง
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
