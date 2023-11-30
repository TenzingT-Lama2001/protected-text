import Link from 'next/link';
import React from 'react';
import { AiFillLock } from 'react-icons/ai';

export function Logo() {
  return (
    <Link href="/" className=" text-[26px] sm:text-[34px] font-semibold tracking-wide p-2 flex items-center sm:ml-4">
      <span className="text-[#3ECF8E]">Protected</span>
      <span className="text-white">Text</span>
      <AiFillLock className="ml-1 sm:ml-2 text-[#3ECF8E]" />
    </Link>
  );
}
