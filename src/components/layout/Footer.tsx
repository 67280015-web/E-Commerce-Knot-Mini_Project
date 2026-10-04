import Link from 'next/link';
import { Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t mt-auto">
      <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white text-lg font-bold mb-4 tracking-wider">KNOTS<span className="text-amber-500">.</span></h4>
          <p className="text-sm leading-relaxed text-stone-400">
            พวงกุญแจถักเชือกแฮนด์เมด มินิมอลที่ใช่คุณ ออกแบบและสั่งทำได้ตามสไตล์ที่คุณต้องการ
          </p>
          <div className="flex gap-4 mt-6">
             <Link href="#" className="text-stone-400 hover:text-white transition-colors"><MessageCircle size={20}/></Link>
             <Link href="#" className="text-stone-400 hover:text-white transition-colors"><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect width='20' height='20' x='2' y='2' rx='5' ry='5'/><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/><line x1='17.5' x2='17.51' y1='6.5' y2='6.5'/></svg></Link>
             <Link href="#" className="text-stone-400 hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
             </Link>
             <Link href="#" className="text-stone-400 hover:text-white transition-colors"><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'/></svg></Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-amber-500 transition-colors">FAQ (คำถามที่พบบ่อย)</Link></li>
            <li><Link href="/faq?tab=shipping" className="hover:text-amber-500 transition-colors">การจัดส่งสินค้า</Link></li>
            <li><Link href="/faq?tab=returns" className="hover:text-amber-500 transition-colors">การเปลี่ยน-คืนสินค้า</Link></li>
            <li><Link href="/contact" className="hover:text-amber-500 transition-colors">ติดต่อเรา</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy (PDPA)</Link></li>
            <li><Link href="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Newsletter</h4>
          <p className="text-sm text-stone-400 mb-3">ติดตามคอลเลกชันใหม่และโปรโมชั่นพิเศษ</p>
          <div className="flex">
            <input type="email" placeholder="Email address" className="px-3 py-2 bg-stone-800 text-white text-sm w-full rounded-l-md outline-none focus:ring-1 focus:ring-amber-500" />
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 text-sm rounded-r-md transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-7xl mt-12 pt-6 border-t border-stone-800 text-xs text-center text-stone-500">
        &copy; {new Date().getFullYear()} KNOTS Macrame. All rights reserved.
      </div>
    </footer>
  );
}


