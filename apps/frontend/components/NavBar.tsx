import { useBoundStore } from '../store/store';
import { Logo } from './Logo';

export default function NavBar() {
  const content = useBoundStore((state) => state.content);
  const handleOnSave = () => {
    console.log(content);
  };
  return (
    <header>
      <nav className="bg-[#1C1C1C] text-white flex flex-col justify-center items-center p-2  border-b border-gray-600 ">
        <Logo />
        <div className="flex gap-3 text-sm my-1 justify-between sm:gap-3">
          <button
            type="button"
            className="text-[#33996B] bg-gray-100 border-[#33996B] p-1 rounded-sm py-2 px-1.5 sm:py-2 sm:px-4 sm:rounded-md transition-all hover:bg-white hover:text-[#70b395]"
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
            className="text-[#af3131] border-[#33996B] bg-gray-100 p-1 hover:bg-white hover:text-[#c24c4c] rounded-sm py-2 px-1.5  sm:py-2 sm:px-4 sm:rounded-md"
          >
            Reset Password
          </button>
          <button
            type="button"
            className="text-[#ffffff] bg-[#af3131] p-1 hover:bg-[#c24c4c] rounded-sm py-2 px-1.5 sm:py-2 sm:px-4 sm:rounded-md"
          >
            Delete
          </button>
        </div>
      </nav>
    </header>
  );
}
