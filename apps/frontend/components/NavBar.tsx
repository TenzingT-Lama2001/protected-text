'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { decrypt, encrypt, hash } from 'encryption-handler';
import { useParams } from 'next/navigation';
import { useContentStore, useInitializeStore } from '../store/store';
import { Logo } from './Logo';
import { UpdateNote, getNote, updateNote } from '../api/note';
import PasswordModal from './PasswordModal';
import DeleteModal from './DeleteModal';

export default function NavBar() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState<boolean>(false);
  const [reload, setReload] = React.useState<boolean>(false);
  const { content, contentHash, secretKey, setContent, setContentHash } = useContentStore();
  const { isNew, setInitialize, setIsNew } = useInitializeStore();
  const params = useParams();
  console.log(params);

  // TODO: MAKE THIS WORK
  const handleDecryption = (note: string) => {
    if (note) {
      const noteIdHash = hash(params.noteId as string);
      const result = decrypt(note, secretKey, noteIdHash);
      if (result.decryptedNote) {
        setContent(result.decryptedNote as string);
        setInitialize(true);
        setIsNew(false);
        const secretKeyHash = hash(secretKey);
        const noteHash = hash(result.decryptedNote + secretKeyHash);
        setContentHash(noteHash);
      }
    }
  };
  const fetchNote = async () => {
    try {
      const { note } = await getNote(params.noteId as string);
      console.log('🚀 ~ file: NavBar.tsx:25 ~ fetchNote ~ note:', note);
      // decrypt the note
      // set content
      handleDecryption(note.note);
    } catch (error: any) {
      console.error('Error fetching note:', error.message);
    }
  };
  React.useEffect(() => {
    if (reload) {
      fetchNote();
      setReload(false);
    }
  }, [reload, setReload]);

  const { mutate: updateNoteMutation } = useMutation({
    mutationFn: async (data: UpdateNote) => updateNote(params.noteId as string, data),
    onSuccess: () => {
      alert('Note saved successfully');
    },
  });

  const handleOnSave = () => {
    if (isNew) {
      setIsPasswordModalOpen(true);
    } else {
      const noteIdHash = hash(params.noteId as string);
      const encryptedNote = encrypt(content, secretKey, noteIdHash);
      const secretKeyHash = hash(secretKey);
      const noteHash = hash(content + secretKeyHash);
      const data: UpdateNote = {
        note: encryptedNote,
        hash: noteHash,
        previousHash: contentHash,
      };
      updateNoteMutation(data);
    }
  };

  const handleResetPassword = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleReload = () => {
    // get the note from the server
    // do not ask for password
    setReload(true);
  };
  return (
    <header>
      <nav className="bg-[#1C1C1C] text-white flex flex-col justify-center items-center p-2  border-b border-gray-600 ">
        <Logo />
        <div className="flex gap-3 text-sm my-1 justify-between sm:gap-3">
          <button
            type="button"
            className="text-[#33996B] bg-gray-100 border-[#33996B] p-1 rounded-sm py-2 px-1.5 sm:py-2 sm:px-4 sm:rounded-md transition-all hover:bg-white hover:text-[#70b395]"
            onClick={() => handleReload()}
          >
            Reload
          </button>

          <button
            onClick={() => handleOnSave()}
            type="button"
            className="text-[#ffffff] bg-[#33996B] p-1 hover:bg-[#70b395] rounded-sm py-2 px-1.5  sm:py-2 sm:px-4 sm:rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            className={`text-[#af3131] border-[#33996B] bg-gray-100 p-1 hover:bg-white hover:text-[#c24c4c] rounded-sm py-2 px-1.5  sm:py-2 sm:px-4 sm:rounded-md ${
              isNew ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleResetPassword()}
          >
            Reset Password
          </button>
          <button
            type="button"
            className="text-[#ffffff] bg-[#af3131] p-1 hover:bg-[#c24c4c] rounded-sm py-2 px-1.5 sm:py-2 sm:px-4 sm:rounded-md"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </nav>
      {isPasswordModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50">
          <PasswordModal onClose={closePasswordModal} />
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50">
          <DeleteModal onClose={closeDeleteModal} />
        </div>
      )}
    </header>
  );
}
