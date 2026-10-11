import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Mail, MessageCircle } from 'lucide-react';
import { products } from '@/data/products';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[85vh] bg-stone-900 flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/products/prod-1.jpg"
            alt="พวงกุญแจถักแมคราเม่ KNOTS"
            fill
            priority
            className="object-cover object-center brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-stone-900/30" />
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-3xl px-6 py-10 bg-white/85 backdrop-blur-md rounded-3xl m-4 shadow-2xl border border-white/40">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-wider uppercase">
            100% Handcrafted with Love
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 leading-tight">
            พวงกุญแจถักแมคราเม่<br/>
            <span className="text-amber-700">สไตล์ที่ใช่คุณ</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 font-normal max-w-xl mx-auto">
            งานแฮนด์เมดประณีตทุกชิ้น ออกแบบลายถักและจับคู่สีที่คุณชอบด้วยตัวเอง แมทช์เข้ากับทุกกระเป๋าอย่างลงตัว
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link href="/shop" className="bg-stone-900 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition font-bold shadow-lg shadow-stone-900/20">
              ช้อปคอลเลกชันล่าสุด
            </Link>
            <Link href="/custom-order" className="bg-white text-stone-900 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-amber-600 hover:text-amber-700 transition font-bold">
              สั่งทำแบบพิเศษ (Custom)
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-amber-700 font-semibold text-sm tracking-wider uppercase">Categories</span>
          <h2 className="text-3xl font-bold mt-1 text-stone-900">หมวดหมู่เด่น</h2>
          <p className="text-stone-500 mt-2">เลือกสไตล์ที่สะท้อนความเป็นคุณ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'สไตล์มินิมอล', desc: 'เรียบง่าย อบอุ่น เข้าได้กับทุกลุค', img: '/images/products/prod-2.jpg', href: '/shop?style=minimal' },
            { name: 'สไตล์เครื่องราง', desc: 'เสริมความมั่นใจ ด้วยหินมงคลแท้', img: '/images/products/prod-3.jpg', href: '/shop?style=charm' },
            { name: 'เซ็ตของขวัญ', desc: 'แพ็กเกจพิเศษ สำหรับคนพิเศษของคุณ', img: '/images/products/prod-4.jpg', href: '/shop?category=giftset' }
          ].map((cat, i) => (
             <Link href={cat.href} key={i} className="group cursor-pointer block">
               <div className="bg-stone-100 aspect-[4/5] rounded-3xl mb-4 overflow-hidden relative shadow-md">
                 <Image
                   src={cat.img}
                   alt={cat.name}
                   fill
                   className="object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
               </div>
               <h3 className="text-xl font-bold text-stone-800 text-center group-hover:text-amber-700 transition-colors">{cat.name}</h3>
               <p className="text-stone-500 text-center text-sm mt-1">{cat.desc}</p>
             </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals + Best Sellers + Ready to Ship */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full border-t border-stone-200">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-amber-700 font-semibold text-sm tracking-wider uppercase">Best Picks</span>
            <h2 className="text-3xl font-bold text-stone-900 mt-1">New Arrivals & Best Sellers</h2>
          </div>
          <Link href="/shop" className="text-amber-700 hover:text-amber-800 font-bold hidden sm:flex items-center gap-1.5 transition-colors">
            ดูสินค้าทั้งหมด <ArrowRight size={18}/>
          </Link>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <Link href={`/product/${prod.id}`} key={prod.id} className="group cursor-pointer flex flex-col">
              <div className="bg-stone-100 aspect-square rounded-2xl mb-3 relative overflow-hidden shadow-sm">
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
              <h3 className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors truncate">{prod.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-amber-700 font-bold text-lg">฿{prod.price}</span>
                <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">{prod.status}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center sm:hidden">
          <Link href="/shop" className="inline-block text-amber-700 border-2 border-amber-700 px-6 py-2.5 rounded-full text-sm font-bold">
            ดูสินค้าทั้งหมด
          </Link>
        </div>
      </section>

      {/* How to Order Steps + Reviews */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <span className="text-amber-700 font-semibold text-sm tracking-wider uppercase">Easy Process</span>
             <h2 className="text-3xl font-bold text-stone-900 mt-1 mb-3">ขั้นตอนการสั่งทำ Custom Order</h2>
             <p className="text-stone-600 max-w-2xl mx-auto">สร้างสรรค์พวงกุญแจที่มีชิ้นเดียวในโลกด้วยตัวคุณเองได้ง่ายๆ ใน 3 ขั้นตอน</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-20">
            {[
              { step: '1', title: 'เลือกลายและสี', desc: 'เลือกลายถักที่ชอบ และจับคู่สีเชือกที่ใช่สำหรับคุณ' },
              { step: '2', title: 'เพิ่มจี้หรือตัวอักษร', desc: 'ใส่ชื่อ หรือเลือกจี้ความหมายดีๆ เพิ่มความพิเศษ' },
              { step: '3', title: 'รอรับสินค้า', desc: 'ใช้เวลาถัก 3-5 วัน และจัดส่งถึงมือคุณอย่างทะนุถนอม' }
            ].map((s, i) => (
              <div key={i} className="relative bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-sm">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-stone-800">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{s.desc}</p>
                {i < 2 && <ArrowRight className="hidden md:block absolute top-1/2 -right-8 -translate-y-1/2 text-stone-300" size={32} />}
              </div>
            ))}
          </div>

          {/* Customer Reviews */}
          <div className="pt-12 border-t border-stone-200">
            <h3 className="text-2xl font-bold text-center mb-10 text-stone-900">เสียงตอบรับจากลูกค้าจริง</h3>
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
                   <span className="text-stone-800 font-bold text-sm">- {rev.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Links / Connect with us */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-3 text-stone-900">CONNECT WITH US</h2>
        <p className="text-stone-500 mb-10">ติดตามข่าวสาร โปรโมชั่น และคอลเลกชันใหม่ได้ที่ช่องทางต่างๆ</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="#" className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-[#00B900] transition-colors text-stone-600 group-hover:text-white shadow-sm">
               <MessageCircle size={24} />
             </div>
             <span className="text-sm font-medium text-stone-600">LINE OA</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-pink-600 transition-colors text-stone-600 group-hover:text-white shadow-sm">
               <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect width='20' height='20' x='2' y='2' rx='5' ry='5'/><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/><line x1='17.5' x2='17.51' y1='6.5' y2='6.5'/></svg>
             </div>
             <span className="text-sm font-medium text-stone-600">Instagram</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-black transition-colors text-stone-600 group-hover:text-white shadow-sm">
               <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5'/></svg>
             </div>
             <span className="text-sm font-medium text-stone-600">TikTok</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors text-stone-600 group-hover:text-white shadow-sm">
               <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'/></svg>
             </div>
             <span className="text-sm font-medium text-stone-600">Facebook</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-800 transition-colors text-stone-600 group-hover:text-white shadow-sm">
               <Mail size={24} />
             </div>
             <span className="text-sm font-medium text-stone-600">E-mail</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
