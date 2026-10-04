"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Upload, MessageCircle, AlertCircle, Check, Image as ImageIcon } from 'lucide-react';

export default function CustomOrderPage() {
  // States for form
  const [pattern, setPattern] = useState('สไตล์คลาสสิก');
  const [mainColor, setMainColor] = useState(0);
  const [letters, setLetters] = useState('');
  const [agreed, setAgreed] = useState(false);

  const patterns = ['สไตล์คลาสสิก', 'สไตล์เกลียว (Twist)', 'ลายถักเปีย (Braid)'];
  const colors = [
    { bg: 'bg-stone-100', name: 'ครีม (Cream)' },
    { bg: 'bg-amber-700', name: 'น้ำตาล (Brown)' },
    { bg: 'bg-stone-800', name: 'ดำ (Black)' },
    { bg: 'bg-rose-300', name: 'ชมพูอ่อน (Pink)' },
    { bg: 'bg-blue-200', name: 'ฟ้า (Light Blue)' },
    { bg: 'bg-green-700', name: 'เขียวเข้ม (Dark Green)' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-24 md:pb-16">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-2 text-xs font-medium text-stone-500">
        <Link href="/" className="hover:text-stone-800 transition-colors">หน้าแรก</Link>
        <ChevronRight size={14} className="text-stone-300" />
        <span className="text-stone-800">สั่งทำพิเศษ (Custom Order)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">สั่งทำพิเศษ (Custom Order)</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">ออกแบบพวงกุญแจที่มีเพียงชิ้นเดียวในโลก เลือกสี เลือกลาย และเพิ่มตัวอักษรได้ตามต้องการ เมื่อออกแบบเสร็จแล้วสามารถส่งแบบให้ทางร้านประเมินราคาผ่าน LINE OA ได้เลยค่ะ</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left: Preview & Upload */}
          <div className="w-full md:w-5/12 bg-stone-100 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-200 relative">
            <div className="bg-white aspect-square w-full max-w-sm rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-stone-300 relative overflow-hidden group">
              <ImageIcon size={48} className="text-stone-300 mb-4" />
              <p className="text-stone-500 font-medium mb-1">ภาพตัวอย่างแบบร่าง</p>
              
              {/* Dynamic summary in preview box */}
              <div className="mt-4 text-left bg-stone-50 p-4 rounded-xl w-full">
                <p className="text-stone-600 text-sm mb-1"><span className="font-bold">ลาย:</span> {pattern}</p>
                <p className="text-stone-600 text-sm mb-1"><span className="font-bold">สีหลัก:</span> {colors[mainColor].name}</p>
                <p className="text-stone-600 text-sm"><span className="font-bold">ตัวอักษร:</span> {letters || '-'}</p>
              </div>
            </div>
            
            {/* Upload Image Section */}
            <div className="mt-8 w-full max-w-sm">
              <label className="block text-sm font-bold text-stone-800 mb-3">มีภาพตัวอย่างที่อยากได้ไหม? (แนบรูป Reference)</label>
              <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center hover:bg-stone-200/50 transition-colors cursor-pointer bg-white">
                <Upload size={24} className="mx-auto text-stone-400 mb-2" />
                <span className="text-sm text-stone-600 font-bold block mb-1">คลิกเพื่ออัปโหลดรูปภาพ</span>
                <span className="text-xs text-stone-400">รองรับ JPG, PNG ขนาดไม่เกิน 5MB</span>
              </div>
            </div>
          </div>

          {/* Right: Customization Form */}
          <div className="w-full md:w-7/12 p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-8">รายละเอียดการสั่งทำ</h2>
            
            <div className="space-y-8">
              {/* Pattern */}
              <div>
                <h3 className="text-sm font-bold text-stone-800 mb-4">1. เลือกลายถัก (Pattern)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {patterns.map((p, i) => (
                    <button 
                      key={i} 
                      onClick={() => setPattern(p)}
                      className={`py-4 px-4 rounded-xl text-sm font-bold border-2 transition-all ${pattern === p ? 'border-amber-600 bg-amber-50 text-amber-800 shadow-sm' : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-sm font-bold text-stone-800 mb-4 flex justify-between items-end">
                  2. เลือกสีเชือกหลัก (Main Color)
                  <span className="text-xs font-medium text-amber-600">{colors[mainColor].name}</span>
                </h3>
                <div className="flex flex-wrap gap-4">
                  {colors.map((color, i) => (
                    <button 
                      key={i} 
                      onClick={() => setMainColor(i)}
                      className={`w-12 h-12 rounded-full border-2 focus:outline-none transition-all shadow-sm ${color.bg} ${mainColor === i ? 'border-amber-600 ring-4 ring-white ring-inset scale-110' : 'border-stone-200 hover:scale-105'}`}
                      aria-label={`Select ${color.name}`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Alphabet/Charms */}
              <div>
                <h3 className="text-sm font-bold text-stone-800 mb-4 flex justify-between items-end">
                  3. เพิ่มจี้ตัวอักษร หรือชื่อ 
                  <span className="text-xs font-normal text-stone-500">(ภาษาอังกฤษ สูงสุด 5 ตัว)</span>
                </h3>
                <input 
                  type="text" 
                  maxLength={5}
                  value={letters}
                  onChange={(e) => setLetters(e.target.value.toUpperCase())}
                  placeholder="เช่น A, JANE, LOVE" 
                  className="w-full border-2 border-stone-200 rounded-xl px-4 py-4 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-bold text-stone-800 uppercase placeholder:normal-case placeholder:text-stone-400 placeholder:font-normal transition-all"
                />
              </div>

              {/* Pricing & Terms */}
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
                <h4 className="font-bold text-stone-800 flex items-center gap-2"><AlertCircle size={20} className="text-amber-600"/> ราคา ระยะเวลา และเงื่อนไข</h4>
                <ul className="text-sm text-stone-600 space-y-3 pl-7 list-disc marker:text-stone-300">
                  <li>ราคาประเมินเบื้องต้น: <strong className="text-stone-800">฿250 - ฿450</strong> <br/><span className="text-xs text-stone-500">(ราคาจริงอาจมีการเปลี่ยนแปลง โดยทางร้านจะแจ้งให้ทราบในแชทตามความยากง่ายของแบบ)</span></li>
                  <li>ระยะเวลาจัดทำ (Lead Time): <strong className="text-stone-800">3-5 วันทำการ</strong> หลังจากที่ลูกค้าชำระเงินเรียบร้อยแล้ว</li>
                  <li>สินค้าสั่งทำพิเศษเป็นงานแฮนด์เมดเฉพาะคุณ <strong className="text-rose-600">ไม่สามารถเปลี่ยน หรือคืนเงินได้ทุกกรณี</strong> เว้นแต่เกิดจากความผิดพลาดของทางร้าน</li>
                </ul>
                
                <label className="flex items-start gap-3 mt-6 cursor-pointer group bg-white p-4 rounded-xl border border-stone-200 hover:border-amber-300 transition-colors">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${agreed ? 'bg-amber-600 border-amber-600' : 'border-stone-300 bg-white group-hover:border-amber-400'}`}>
                    {agreed && <Check size={16} className="text-white" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={agreed} onChange={() => setAgreed(!agreed)} />
                  <span className="text-sm text-stone-700 font-bold select-none leading-relaxed">ฉันได้อ่าน ทำความเข้าใจ และยอมรับเงื่อนไขการสั่งทำสินค้าทั้งหมดเรียบร้อยแล้ว</span>
                </label>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button 
                  disabled={!agreed}
                  className={`w-full py-4.5 rounded-2xl font-bold flex items-center justify-center gap-3 text-lg transition-all ${agreed ? 'bg-[#00B900] hover:bg-[#009900] text-white shadow-lg shadow-[#00B900]/25' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
                  style={{ padding: '1.125rem' }}
                >
                  <MessageCircle size={24} /> ส่งแบบประเมินราคาผ่าน LINE OA
                </button>
                <p className="text-center text-xs text-stone-500 mt-4">ระบบจะบันทึกแบบที่คุณเลือกและพาคุณไปยังแอปพลิเคชัน LINE <br className="hidden md:block"/>เพื่อส่งข้อมูลให้แอดมินโดยอัตโนมัติ</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
