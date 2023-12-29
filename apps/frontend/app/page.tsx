'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainNav from '../components/MainNav';

export default function Home() {
  const [site, setSite] = useState<string>('');
  const router = useRouter();

  const handleCreateSite = async () => {
    router.push(`/${site}`);
  };

  return (
    <main className="flex min-h-screen flex-col ">
      <MainNav />
      <section className="mt-20 p-4">
        <div className="flex flex-col items-center ">
          <h1 className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl text-center p-2">
            <span className="block text-[#DCDCDC]">Where your words</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#3ECF8E] via-[#3ECF8E] to-[#3ecfb2] block md:ml-0 mb:1">
              Stay yours
            </span>
          </h1>
          <p className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg text-[#DCDCDC] text-center w-full max-w-md p-2 leading-5 sm:max-w-lg md:max-w-xl font-medium">
            Protected Text is your trusted online sanctuary for securely storing and accessing your personal notes and
            thoughts without the need to create an account. Your privacy, our priority.
          </p>
          <div className="flex gap-2 mt-4">
            <input
              className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#33996B] placeholder-gray-400"
              type="text"
              placeholder="Enter your site name"
              value={site}
              onChange={(e) => setSite(e.target.value)}
            />
            <button
              type="button"
              className="text-[#ffffff] bg-[#33996B] hover:bg-[#70b395] rounded-md py-2 px-3 text-sm font-semibold"
              onClick={() => handleCreateSite()}
            >
              Create site
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
