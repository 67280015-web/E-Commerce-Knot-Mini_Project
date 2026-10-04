"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      setLoading(false);
    } else {
      router.push('/account'); // ล็อคอินสำเร็จ ให้ไปหน้า Account
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-stone-200 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">เข้าสู่ระบบ</h1>
          <p className="text-stone-500 text-sm">เข้าสู่ระบบเพื่อติดตามสถานะคำสั่งซื้อของคุณ</p>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-600 text-sm p-4 rounded-xl mb-6 font-medium text-center border border-rose-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">อีเมล</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50 focus:bg-white transition-colors" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">รหัสผ่าน</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-stone-50 focus:bg-white transition-colors" 
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-amber-600 w-4 h-4 rounded border-stone-300" />
              <span className="text-stone-600">จดจำฉันไว้</span>
            </label>
            <Link href="#" className="text-amber-600 font-medium hover:underline">ลืมรหัสผ่าน?</Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-md mt-4 ${loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-stone-900 hover:bg-stone-800'}`}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-stone-500">
          ยังไม่มีบัญชีใช่ไหม? <Link href="#" className="text-amber-600 font-bold hover:underline">สมัครสมาชิก</Link>
        </div>
        
        {/* Helper info for mock login */}
        <div className="mt-8 pt-6 border-t border-stone-100 text-xs text-stone-400 text-center">
          <p>Demo Login:</p>
          <p>Email: demo@example.com | Pass: password</p>
        </div>
      </div>
    </div>
  );
}
