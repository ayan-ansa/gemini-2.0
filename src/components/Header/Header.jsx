import { MdArrowDropDown } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import gemini_logo from "../../assets/gemini_logo.svg";
import user from "../../assets/user.png";
import { IoApps } from "react-icons/io5";
function Header({ setIsActive }) {
  return (
    <header className="flex items-center justify-between my-4 mx-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full media960:hidden w-fit hover:bg-[#303234]">
          <IoMenu
            className="text-2xl cursor-pointer"
            onClick={() => setIsActive((prev) => !prev)}
          />
        </div>
        <div className="flex items-center gap-2 py-1 pb-2 px-2 rounded-md hover:bg-[#232527]">
          <h1 className="text-xl">Gemini</h1>
          <MdArrowDropDown className="text-2xl" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="items-center hidden lg:flex gap-2 px-3 py-[7px] bg-[#303234] rounded-md hover:bg-[#232527] cursor-pointer">
          <img src={gemini_logo} alt="gemini_logo" />
          <span className="text-sm">Try Gemini Advance</span>
        </div>
        <div className="p-2 hidden lg:block rounded-full hover:bg-[#303234]">
          <IoApps className="text-xl cursor-pointer" />
        </div>
        <div className="cursor-pointer">
          <img src={user} alt="user_image" className="w-9 rounded-full" />
        </div>
      </div>
    </header>
  );
}

export default Header;
