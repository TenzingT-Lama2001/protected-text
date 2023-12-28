'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { decrypt, hash } from 'encryption-handler';
import { useContentStore, useInitializeStore } from '../store/store';

interface ConfirmationModalProps {
  onConfirm: (proceed: boolean) => void;
  note: string | undefined;
}

export default function ConfirmationModal({ note, onConfirm }: ConfirmationModalProps) {
  const [password, setPassword] = React.useState<string>('');
  const router = useRouter();
  const params = useParams();
  const [error, setError] = React.useState<string | undefined>('');
  const { setContent, setContentHash, setSecretKey } = useContentStore();
  const { setInitialize, setIsNew } = useInitializeStore();

  const handleCreateSite = () => {
    onConfirm(true);
  };

  const handleNoClick = () => {
    onConfirm(false);
    router.push('/');
  };

  const handleDecryption = () => {
    if (note) {
      const noteIdHash = hash(params.noteId as string);
      const result = decrypt(note, password, noteIdHash);
      if (result.decryptedNote) {
        setContent(result.decryptedNote as string);
        setInitialize(true);
        setIsNew(false);
        const secretKeyHash = hash(password);
        const noteHash = hash(result.decryptedNote + secretKeyHash);
        setContentHash(noteHash);
        setSecretKey(password);
        onConfirm(true);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#242424] p-4 rounded-md shadow-md sm:w-96 w-[calc(100%-2rem)] mx-auto">
      {note ? (
        <>
          <div className="flex flex-col flex-wrap gap-1 p-2">
            <p className="text-lg md:text-xl font-normal text-[#D9D9D9]">This site exists!</p>
            <p className="md:text-lg font-normal text-[#7E7E7E]">Enter your password to decrypt your note</p>
          </div>
          <div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#333333] rounded-md py-2.5 px-3 outline-none text-[#D9D9D9]"
              />
              <div>
                <p className="text-xs text-[#D9D9D9] my-4 text-center">{error}</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-3">
              <button
                type="button"
                onClick={() => handleDecryption()}
                className="text-[#ffffff] bg-[#33996B] hover:bg-[#70b395] rounded-md py-2.5 px-3"
              >
                Decrypt
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
        </>
      ) : (
        <>
          <div className="flex flex-col flex-wrap gap-1 p-2">
            <p className="text-lg md:text-xl font-normal text-[#D9D9D9]">Create new site?</p>
            <p className="md:text-lg font-normal text-[#7E7E7E]">
              Great! This site doesn&rsquo;t exist, it can be yours! Would you like to create:
            </p>
          </div>

          <div className="flex justify-center space-x-4 mt-3">
            <button
              type="button"
              onClick={() => handleCreateSite()}
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
        </>
      )}
    </div>
  );
}
