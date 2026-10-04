"use client";

import Link from 'next/link';
import { Heart, Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-stone-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-800 opacity-80 z-0">
          {/* Placeholder for Hero background image */}
          <div className="w-full h-full bg-stone-800 flex items-center justify-center">
             <span className="text-stone-700 text-xl font-medium">ภาพบรรยากาศการถักเชือก / ภาพ Brand Lifestyle</span>
          </div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wide">เรื่องราวของเรา</h1>
          <p className="text-lg md:text-xl text-stone-200 font-light leading-relaxed">
            จุดเริ่มต้นจากความหลงใหลในงานแฮนด์เมด สู่งานศิลปะที่ใช้งานได้จริงในชีวิตประจำวัน
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 px-4 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h2 className="text-3xl font-bold text-stone-800 mb-6">KNOTS.<br/><span className="text-amber-600 font-medium text-2xl">ถักทอด้วยใจ ใส่ใจทุกเส้น</span></h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>เราเริ่มต้นแบรนด์นี้จากความชื่นชอบในความเรียบง่ายของศิลปะ "แมคราเม่" (Macrame) หรือการถักเชือก ซึ่งเป็นงานฝีมือที่ต้องอาศัยสมาธิ ความใจเย็น และความประณีตในทุกรอยมัด</p>
              <p>KNOTS ไม่ได้เป็นเพียงแค่พวงกุญแจ แต่เราตั้งใจให้เป็นเครื่องประดับกระเป๋าที่สะท้อนตัวตนของคุณ ผ่านการเลือกสีและลายถักที่คุณสามารถออกแบบได้เอง ทำให้ผลงานทุกชิ้นมีความพิเศษและมีเพียงชิ้นเดียวในโลก</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="bg-stone-100 aspect-square rounded-3xl overflow-hidden relative shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-stone-400">รูปภาพคนกำลังถักเชือก</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">สิ่งที่เราให้ความสำคัญ</h2>
            <p className="text-stone-600">เราใส่ใจในทุกรายละเอียด เพื่อให้คุณได้รับสิ่งที่ดีที่สุด</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">คอตตอน 100% เกรดพรีเมียม</h3>
              <p className="text-stone-600 text-sm leading-relaxed">เราเลือกใช้เชือกฝ้ายแท้ที่ไม่ผสมใยสังเคราะห์ ให้สัมผัสนุ่มละมุน เป็นมิตรต่อสิ่งแวดล้อม และมีความแข็งแรงทนทาน</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">แฮนด์เมด 100%</h3>
              <p className="text-stone-600 text-sm leading-relaxed">สินค้าทุกชิ้นถักด้วยมือ (Handmade) อย่างพิถีพิถันจากช่างฝีมือของเรา ไม่ได้ใช้เครื่องจักรในการผลิต</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">อิสระในการออกแบบ</h3>
              <p className="text-stone-600 text-sm leading-relaxed">เราเชื่อว่าทุกคนมีสไตล์ที่แตกต่างกัน คุณจึงสามารถเลือกลาย สี และปรับแต่งรายละเอียดได้เองในหมวดหมู่ Custom Order</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Next Steps */}
      <section className="py-24 px-4 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-stone-800 mb-6">พร้อมที่จะออกแบบชิ้นงานของคุณแล้วหรือยัง?</h2>
        <p className="text-stone-600 mb-10">เลือกดูคอลเลกชันล่าสุดของเรา หรือเริ่มต้นออกแบบพวงกุญแจที่มีเพียงชิ้นเดียวในโลกด้วยตัวคุณเอง</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/shop" className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 rounded-full font-bold transition-colors">
            ดูสินค้าทั้งหมด
          </Link>
          <Link href="/custom-order" className="bg-white border-2 border-stone-200 hover:border-amber-600 hover:text-amber-700 text-stone-800 px-8 py-4 rounded-full font-bold transition-colors">
            สั่งทำพิเศษ (Custom)
          </Link>
        </div>
      </section>

    </div>
  );
}
