import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';
import useContentStore from '../store/zustand';

export default function NavBar() {
  const { content } = useContentStore(
    useShallow((state) => ({
      content: state.content,
    })),
  );
  const handleOnSave = () => {
    console.log('Saving content', content);
  };
  return (
    <header>
      <nav className="bg-[#4F46E5] text-white flex flex-col justify-center items-center p-3 ">
        <Link href="/" className="text-[24px] font-medium">
          ProtectedText
        </Link>

        <div className="flex gap-3 text-sm my-2 justify-between sm:gap-4">
          <button type="button" className="text-[#4F46E5] bg-white p-1 rounded-md sm:px-2 py-1">
            Reload
          </button>
          <button
            onClick={() => handleOnSave()}
            type="button"
            className="text-[#4F46E5] bg-white p-1 rounded-md sm:px-2 py-1"
          >
            Save
          </button>
          <button type="button" className="text-[#4F46E5] bg-white p-1 rounded-md sm:px-2 py-1">
            Change Password
          </button>
          <button type="button" className="text-[#4F46E5] bg-white p-1 rounded-md sm:px-2 py-1">
            Delete
          </button>
        </div>
      </nav>
    </header>
  );
}
