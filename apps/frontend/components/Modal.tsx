import React from 'react';
import { useRouter } from 'next/navigation';

interface ConfirmationModalProps {
  onConfirm: (proceed: boolean) => void;
}

export default function ConfirmationModal({ onConfirm }: ConfirmationModalProps) {
  const router = useRouter();

  const handleCreateSite = () => {
    onConfirm(true);
  };

  const handleNoClick = () => {
    onConfirm(false);
    router.push('/');
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#242424] p-4 rounded-md shadow-md sm:w-96 w-[calc(100%-2rem)] mx-auto">
      <div className="flex flex-col flex-wrap gap-1 p-2">
        <p className="text-lg md:text-xl font-normal text-[#D9D9D9]">Create new site?</p>
        <p className="md:text-lg font-normal text-[#7E7E7E]">
          Great! This site doesn&rsquo;t exist, it can be yours! Would you like to create:
        </p>
      </div>

      <div className="flex justify-center space-x-4 mt-3">
        <button
          type="button"
          onClick={handleCreateSite}
          className="text-[#ffffff] bg-[#33996B] hover:bg-[#70b395] rounded-md py-2.5 px-3"
        >
          Create site
        </button>
        <button
          type="button"
          onClick={handleNoClick}
          className="text-[#ffffff] bg-[#af3131] hover:bg-[#c24c4c] rounded-md py-2.5 px-5 "
        >
          No
        </button>
      </div>
    </div>
  );
}
