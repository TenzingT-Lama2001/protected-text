'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { deleteNote } from '../api/note';

interface DeleteModalProps {
  onClose: () => void;
}
export default function DeleteModal({ onClose }: DeleteModalProps) {
  const params = useParams();
  const { mutate: deleteNoteMutation } = useMutation({
    mutationFn: async () => deleteNote(params.noteId as string),
    onSuccess: () => {
      alert('Site deleted successfully');
      // TODO: push to params.noteId page
      // HOW TO RELOAD THE PAGE SOMEONE HELP PLS
      // router.push(`/${params.noteId}`) not working;
      window.location.reload();
    },
  });

  const handleDelete = () => {
    deleteNoteMutation();
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#242424] p-4 rounded-md shadow-md sm:w-96 w-[calc(100%-2rem)] mx-auto">
      <div className="flex flex-col flex-wrap gap-1 p-2">
        <p className="text-lg md:text-xl font-normal text-[#D9D9D9]">Delete site?</p>
        <p className="md:text-sm font-normal text-[#7E7E7E]">
          You are going to delete this site. This action cannot be undone.
        </p>
      </div>
      <div>
        <div className="flex justify-center space-x-4 mt-3">
          <button
            type="button"
            className="text-[#ffffff] bg-[#33996B] hover:bg-[#70b395] rounded-md py-2.5 px-3 "
            onClick={() => handleDelete()}
          >
            Delete
          </button>
          <button
            type="button"
            className="text-[#ffffff] bg-[#af3131] hover:bg-[#c24c4c] rounded-md py-2.5 px-5 "
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
