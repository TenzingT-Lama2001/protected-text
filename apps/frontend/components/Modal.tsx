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
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md sm:w-96 w-[calc(100%-2rem)] mx-auto">
      <div className="flex flex-col flex-wrap gap-3">
        <p className="text-lg md:text-xl font-semibold">Create new site?</p>
        <p className="text-base md:text-lg">
          Great! This site doesn&rsquo;t exist, it can be yours! Would you like to create:
        </p>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <button
          type="button"
          onClick={handleCreateSite}
          className="px-4 py-2 md:px-6 md:py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create site
        </button>
        <button
          type="button"
          onClick={handleNoClick}
          className="px-4 py-2 md:px-6 md:py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          No
        </button>
      </div>
    </div>
  );
}
