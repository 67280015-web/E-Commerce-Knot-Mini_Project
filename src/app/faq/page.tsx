"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    category: "การสั่งซื้อและการชำระเงิน",
    questions: [
      {
        q: "มีช่องทางการชำระเงินใดบ้าง?",
        a: "ทางร้านรับชำระเงินผ่าน 2 ช่องทางหลัก คือ 1. สแกน QR PromptPay (สแกนผ่านแอปธนาคารใดก็ได้) 2. โอนเงินผ่านบัญชีธนาคาร (กสิกรไทย)"
      },
      {
        q: "สั่งทำ Custom Order ต้องทำอย่างไร?",
        a: "ลูกค้าสามารถไปที่เมนู 'งานสั่งทำ' เลือกแบบ สี และตัวอักษรที่ต้องการ จากนั้นกดปุ่ม 'ส่งแบบประเมินราคา' ระบบจะพาไปที่ LINE OA เพื่อพูดคุยและสรุปราคากับแอดมินค่ะ"
      },
      {
        q: "สินค้าสั่งทำ (Custom Order) ใช้เวลาทำนานเท่าไหร่?",
        a: "เนื่องจากเป็นงานแฮนด์เมดถักมือ 100% จะใช้เวลาจัดทำประมาณ 3-5 วันทำการ (ไม่รวมเสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์) หลังจากลูกค้าชำระเงินเรียบร้อยแล้วค่ะ"
      }
    ]
  },
  {
    category: "การจัดส่งสินค้า",
    questions: [
      {
        q: "ค่าจัดส่งเท่าไหร่?",
        a: "เรามีบริการจัดส่ง 2 รูปแบบ: 1. ลงทะเบียน ราคา 35 บาท (ใช้เวลา 3-5 วัน) 2. EMS ด่วนพิเศษ ราคา 50 บาท (ใช้เวลา 1-2 วัน)"
      },
      {
        q: "มีบริการเก็บเงินปลายทาง (COD) ไหม?",
        a: "ขออภัยด้วยค่ะ ปัจจุบันทางร้านยังไม่มีบริการเก็บเงินปลายทางค่ะ"
      },
      {
        q: "ตรวจสอบสถานะพัสดุได้อย่างไร?",
        a: "เมื่อทางร้านจัดส่งสินค้าเรียบร้อยแล้ว จะมีการแจ้งเลขพัสดุ (Tracking Number) ทางอีเมล หรือลูกค้าสามารถเช็คได้ที่เมนู 'บัญชีของฉัน > ประวัติการสั่งซื้อ' ค่ะ"
      }
    ]
  },
  {
    category: "การเปลี่ยน-คืนสินค้า",
    questions: [
      {
        q: "สามารถขอคืนเงินหรือเปลี่ยนสินค้าได้ไหม?",
        a: "สำหรับ 'สินค้าพร้อมส่ง' สามารถเปลี่ยนคืนได้ภายใน 7 วันหากสินค้าชำรุดจากการผลิต แต่สำหรับ 'สินค้าสั่งทำ (Custom Order)' ทางร้านขอสงวนสิทธิ์ไม่รับเปลี่ยนหรือคืนเงินทุกกรณี เว้นแต่เป็นความผิดพลาดจากทางร้าน (เช่น ส่งผิดสี ผิดแบบ) ค่ะ"
      }
    ]
  },
  {
    category: "การดูแลรักษา",
    questions: [
      {
        q: "เชือกแมคราเม่ ซักทำความสะอาดได้ไหม?",
        a: "สามารถทำความสะอาดได้ค่ะ หากเปื้อนเฉพาะจุด แนะนำให้ใช้แปรงขนอ่อนจุ่มน้ำสบู่อ่อนๆ แปรงเบาๆ แล้วซับน้ำออก นำไปตากในที่ร่มให้แห้งสนิท (หลีกเลี่ยงการตากแดดจัด) และไม่แนะนำให้นำไปซักในเครื่องซักผ้าค่ะ"
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-stone-200 rounded-2xl mb-4 overflow-hidden bg-white">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-stone-50 transition-colors"
      >
        <span className="font-bold text-stone-800">{question}</span>
        <ChevronDown size={20} className={`text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`px-5 text-stone-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {answer}
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  return (
    <div className="min-h-screen bg-stone-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">คำถามที่พบบ่อย (FAQ)</h1>
          <p className="text-stone-600">รวบรวมคำตอบสำหรับข้อสงสัยที่พบบ่อยเกี่ยวกับการสั่งซื้อ จัดส่ง และดูแลรักษา</p>
        </div>

        {/* Category Tabs (Desktop) / Scrollable (Mobile) */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2 border-b border-stone-200">
          {faqs.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat.category)}
              className={`whitespace-nowrap px-5 py-3 rounded-full text-sm font-bold transition-colors ${activeCategory === cat.category ? 'bg-stone-900 text-white' : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'}`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="min-h-[400px]">
          {faqs.find(c => c.category === activeCategory)?.questions.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-16 bg-white p-8 rounded-3xl text-center border border-stone-200 shadow-sm">
          <h3 className="text-xl font-bold text-stone-800 mb-3">ยังไม่พบคำตอบที่คุณตามหาใช่ไหม?</h3>
          <p className="text-stone-600 mb-6 text-sm">ทักแชทพูดคุยกับแอดมินของเราได้เลยค่ะ เรายินดีให้บริการเสมอ</p>
          <Link href="#" className="inline-flex items-center gap-2 bg-[#00B900] hover:bg-[#009900] text-white px-8 py-3.5 rounded-full font-bold transition-colors shadow-md">
            <MessageCircle size={20} /> แชทกับเราผ่าน LINE
          </Link>
        </div>

      </div>
    </div>
  );
}
