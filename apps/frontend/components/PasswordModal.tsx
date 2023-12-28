import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { encrypt, hash } from 'encryption-handler';
import { useParams } from 'next/navigation';
import { useContentStore, useInitializeStore } from '../store/store';
import { PostNote, postNote } from '../api/note';

interface PasswordModalProps {
  onClose: () => void;
}
export default function PasswordModal({ onClose }: PasswordModalProps) {
  const { isNew } = useInitializeStore();
  const [password, setPassword] = React.useState<string>('');
  const [repeatPassword, setRepeatPassword] = React.useState<string>('');
  const [passwordMatch, setPasswordMatch] = React.useState<boolean>(false);
  const { content, setSecretKey } = useContentStore();
  const { setIsNew } = useInitializeStore();
  const params = useParams();

  const { mutate: postNoteMutation } = useMutation({
    mutationFn: async (data: PostNote) => postNote(data),
    onSuccess: () => {
      // TODO: IMPLEMENT TOAST
      alert('Note saved successfully');
      onClose();
      setIsNew(false);
    },
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordMatch(newPassword === repeatPassword);
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRepeatPassword = e.target.value;
    setRepeatPassword(newRepeatPassword);
    setPasswordMatch(newRepeatPassword === password);
  };

  const handleEncryption = () => {
    if (passwordMatch) {
      setSecretKey(password);
      const noteIdHash = hash(params.noteId as string);
      const encryptedNote = encrypt(content, password, noteIdHash);
      const secretKeyHash = hash(password);
      const noteHash = hash(content + secretKeyHash);
      const data: PostNote = {
        noteId: params.noteId as string,
        note: encryptedNote,
        hash: noteHash,
      };
      postNoteMutation(data);
    }
  };
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#242424] p-4 rounded-md shadow-md sm:w-96 w-[calc(100%-2rem)] mx-auto">
      {isNew ? (
        <>
          <div className="flex flex-col flex-wrap gap-1 p-2">
            <p className="text-lg md:text-xl font-normal text-[#D9D9D9]">Create password</p>
            <p className="md:text-sm font-normal text-[#7E7E7E]">
              Make sure to remember the password. We don&apos;t store passwords, just the encrypted data. (If the
              password is forgotten, the data can&apos;t be accessed.) Longer passwords are more secure.
            </p>
          </div>
          <div>
            <div className="flex flex-col">
              <p className="text-xs text-[#D9D9D9] my-4">Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                className="w-full bg-[#333333] rounded-md py-2.5 px-3 outline-none text-[#D9D9D9]"
              />
              <p className="text-xs text-[#D9D9D9] my-4">Repeat Password</p>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => handleRepeatPasswordChange(e)}
                className="w-full bg-[#333333] rounded-md py-2.5 px-3 outline-none text-[#D9D9D9]"
              />
            </div>
            <div className="flex justify-center space-x-4 mt-3">
              <button
                type="button"
                disabled={!passwordMatch}
                className={`text-[#ffffff] bg-[#33996B] hover:bg-[#70b395] rounded-md py-2.5 px-3 ${
                  !passwordMatch ? 'opacity-50 cursor-not-allowed' : '' // Add disabled styles
                }`}
                onClick={() => handleEncryption()}
              >
                Encrypt
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
        </>
      ) : (
        <>
          <div className="flex flex-col flex-wrap gap-1 p-2">
            <p className="text-lg md:text-xl font-normal text-[#D9D9D9]">Change password</p>
            <p className="md:text-sm font-normal text-[#7E7E7E]">
              Enter new password and click Save. Make sure to remember the password. We don&apos;t store passwords, just
              the encrypted data. (If the password is forgotten, the data can&apos;t be accessed.) Longer passwords are
              more secure.
            </p>
          </div>
          <div>
            <div className="flex flex-col">
              <p className="text-xs text-[#D9D9D9] my-4">Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                className="w-full bg-[#333333] rounded-md py-2.5 px-3 outline-none text-[#D9D9D9]"
              />
              <p className="text-xs text-[#D9D9D9] my-4">Repeat Password</p>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => handleRepeatPasswordChange(e)}
                className="w-full bg-[#333333] rounded-md py-2.5 px-3 outline-none text-[#D9D9D9]"
              />
            </div>
            <div className="flex justify-center space-x-4 mt-3">
              <button
                type="button"
                className={`text-[#ffffff] bg-[#33996B] hover:bg-[#70b395] rounded-md py-2.5 px-3 ${
                  !passwordMatch ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handleEncryption()}
              >
                Save
              </button>
              <button
                type="button"
                className="text-[#ffffff] bg-[#af3131] hover:bg-[#c24c4c] rounded-md py-2.5 px-5 "
                onClick={() => onClose()}
              >
                No
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
