import Link from 'next/link';
import { ArrowRight, Star, Mail, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[80vh] bg-stone-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-200 z-0 flex items-center justify-center">
          <span className="text-stone-300 text-2xl font-light">Hero Banner (ภาพพวงกุญแจใช้งานจริง)</span>
        </div>
        <div className="relative z-10 text-center space-y-6 max-w-2xl px-4 bg-white/70 backdrop-blur-sm p-8 rounded-3xl m-4">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 leading-tight">พวงกุญแจถักแมคราเม่<br/>สไตล์ที่ใช่คุณ</h1>
          <p className="text-lg text-stone-600 font-light">งานแฮนด์เมดทุกชิ้น ออกแบบลายถักและสีที่คุณชอบด้วยตัวเอง แมทช์ได้กับทุกกระเป๋า</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/shop" className="bg-stone-800 text-white px-8 py-3.5 rounded-full hover:bg-stone-700 transition font-medium">
              ช้อปคอลเลกชันล่าสุด
            </Link>
            <Link href="/custom-order" className="bg-white text-stone-800 px-8 py-3.5 rounded-full border border-stone-300 hover:bg-stone-50 transition font-medium">
              สั่งทำแบบพิเศษ (Custom)
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">หมวดหมู่เด่น</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'สไตล์มินิมอล', desc: 'เรียบง่าย เข้าได้กับทุกลุค' },
            { name: 'สไตล์เครื่องราง', desc: 'เสริมความมั่นใจ ด้วยหินมงคล' },
            { name: 'เซ็ตของขวัญ', desc: 'แพ็กเกจพิเศษ สำหรับคนพิเศษ' }
          ].map((cat, i) => (
             <Link href="/shop" key={i} className="group cursor-pointer block">
               <div className="bg-stone-100 aspect-[4/5] rounded-2xl mb-4 overflow-hidden relative">
                 <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition duration-700 ease-in-out flex items-center justify-center">
                   <span className="text-stone-400">รูป {cat.name}</span>
                 </div>
               </div>
               <h3 className="text-xl font-semibold text-stone-800 text-center">{cat.name}</h3>
               <p className="text-stone-500 text-center text-sm mt-1">{cat.desc}</p>
             </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals + Best Sellers + Ready to Ship */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full border-t border-stone-200">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-bold text-stone-800">New Arrivals & Best Sellers</h2>
          <Link href="/shop" className="text-amber-600 hover:text-amber-700 font-medium hidden sm:flex items-center gap-1">ดูทั้งหมด <ArrowRight size={16}/></Link>
        </div>
        
        {/* Product Grid Mockup */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Daisy Dream', price: '฿250', tag: 'New', status: 'พร้อมส่ง' },
            { name: 'Minimal Knot', price: '฿190', tag: 'Best Seller', status: 'สั่งทำ 3-5 วัน' },
            { name: 'Lucky Stone', price: '฿320', tag: '', status: 'พร้อมส่ง' },
            { name: 'Earth Tone Set', price: '฿450', tag: '', status: 'พร้อมส่ง' },
          ].map((prod, i) => (
            <div key={i} className="group cursor-pointer flex flex-col">
              <div className="bg-stone-100 aspect-square rounded-xl mb-3 relative overflow-hidden">
                {prod.tag && (
                  <span className="absolute top-2 left-2 bg-white/90 text-stone-800 text-xs font-bold px-2 py-1 rounded shadow-sm z-10">{prod.tag}</span>
                )}
                <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition duration-700 flex items-center justify-center">
                  <span className="text-stone-400 text-sm">รูปสินค้า</span>
                </div>
              </div>
              <h3 className="font-semibold text-stone-800">{prod.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-amber-700 font-medium">{prod.price}</span>
                <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">{prod.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="inline-block text-amber-600 border border-amber-600 px-6 py-2 rounded-full text-sm">ดูสินค้าทั้งหมด</Link>
        </div>
      </section>

      {/* How to Order Steps + Reviews */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-stone-800 mb-4">ขั้นตอนการสั่งทำ Custom Order</h2>
             <p className="text-stone-600 max-w-2xl mx-auto">สร้างสรรค์พวงกุญแจที่มีชิ้นเดียวในโลกด้วยตัวคุณเอง</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-20">
            {[
              { step: '1', title: 'เลือกลายและสี', desc: 'เลือกลายถักที่ชอบ และจับคู่สีเชือกที่ใช่สำหรับคุณ' },
              { step: '2', title: 'เพิ่มจี้หรือตัวอักษร', desc: 'ใส่ชื่อ หรือเลือกจี้ความหมายดีๆ เพิ่มความพิเศษ' },
              { step: '3', title: 'รอรับสินค้า', desc: 'ใช้เวลาถัก 3-5 วัน และจัดส่งถึงมือคุณอย่างทะนุถนอม' }
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {s.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-stone-800">{s.title}</h3>
                <p className="text-stone-600">{s.desc}</p>
                {i < 2 && <ArrowRight className="hidden md:block absolute top-8 -right-6 text-stone-300" size={32} />}
              </div>
            ))}
          </div>

          {/* Customer Reviews inside How to order section as requested */}
          <div className="pt-12 border-t border-stone-200">
            <h3 className="text-2xl font-bold text-center mb-10 text-stone-800">เสียงตอบรับจากลูกค้า</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { name: 'คุณ A.', review: 'งานถักละเอียดมาก สีสวยตรงปก แข็งแรงทนทาน ชอบมากๆ ค่ะ' },
                 { name: 'คุณ K.', review: 'สั่งทำเป็นของขวัญวันเกิดให้เพื่อน ทางร้านแนะนำดีมาก ประทับใจสุดๆ' },
                 { name: 'คุณ N.', review: 'แพ็กเกจน่ารัก หอมมาก เอาไปห้อยกระเป๋าแล้วดูดีขึ้นเลย แนะนำร้านนี้ค่ะ' }
               ].map((rev, i) => (
                 <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                   <div className="flex text-amber-400 mb-3">
                     {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                   </div>
                   <p className="text-stone-600 text-sm mb-4 leading-relaxed">"{rev.review}"</p>
                   <span className="text-stone-800 font-medium text-sm">- {rev.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Links / Connect with us */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 text-stone-800">CONNECT WITH US</h2>
        <p className="text-stone-500 mb-10">ติดตามข่าวสาร โปรโมชั่น และคอลเลกชันใหม่ได้ที่ช่องทางต่างๆ</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="#" className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors text-stone-600 group-hover:text-amber-700">
               <MessageCircle size={24} />
             </div>
             <span className="text-sm font-medium text-stone-600">LINE OA</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors text-stone-600 group-hover:text-amber-700">
               <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect width='20' height='20' x='2' y='2' rx='5' ry='5'/><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/><line x1='17.5' x2='17.51' y1='6.5' y2='6.5'/></svg>
             </div>
             <span className="text-sm font-medium text-stone-600">Instagram</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors text-stone-600 group-hover:text-amber-700">
               {/* TikTok icon approximation using Lucide (no native tiktok icon, using generic play or text) */}
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
             </div>
             <span className="text-sm font-medium text-stone-600">TikTok</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors text-stone-600 group-hover:text-amber-700">
               <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'/></svg>
             </div>
             <span className="text-sm font-medium text-stone-600">Facebook</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors text-stone-600 group-hover:text-amber-700">
               <Mail size={24} />
             </div>
             <span className="text-sm font-medium text-stone-600">E-mail</span>
          </Link>
        </div>
      </section>
    </div>
  );
}


