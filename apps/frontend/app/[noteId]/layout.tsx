'use client';

import { Poppins } from 'next/font/google';
import { useState } from 'react';
import NavBar from '../../components/NavBar';
import ConfirmationModal from '../../components/Modal';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function NoteLayout({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(true);

  const handleUserChoice = (proceed: boolean) => {
    if (proceed) {
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };
  return (
    <div className={`${poppins.className} flex flex-col min-h-screen `}>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50">
          <ConfirmationModal onConfirm={handleUserChoice} />
        </div>
      )}
      <NavBar />
      {children}
    </div>
  );
}
