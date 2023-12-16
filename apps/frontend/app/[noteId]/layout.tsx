'use client';

import { Poppins } from 'next/font/google';
import NavBar from '../../components/NavBar';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function NoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.className} flex flex-col min-h-screen `}>
      <NavBar />
      {children}
    </div>
  );
}
