import { IoMenu } from "react-icons/io5";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import { GrCircleQuestion } from "react-icons/gr";
import { MdArrowDropDown, MdOutlineSettings } from "react-icons/md";
// import { useState } from "react";

function Sidebar({
  isActive,
  setIsActive,
  setFilteredData,
  setIsShow,
  itemId,
  setItemId,
}) {
  const searchHistory = JSON.parse(localStorage.getItem("searchData")) || [];
  const handleFilter = (id) => {
    setItemId(id);
    setIsActive(false);
    setIsShow(true);
    const filtered = searchHistory.filter((item) => item.id == id);
    setFilteredData(filtered);
  };

  return (
    <aside
      id="sidebar"
      className={`min-h-screen flex top-0 w-80 z-50 flex-col absolute md:static justify-between bg-[#1E1F20] text-gray-300 px-3 py-5 ${
        isActive ? "media960:left-80" : "-left-80 media960:w-[72px]"
      }`}
    >
      <div id="top">
        <div className="flex items-center">
          <div className="p-2 rounded-full w-fit hover:bg-[#303234]">
            <IoMenu
              className="text-2xl cursor-pointer"
              onClick={() => setIsActive((prev) => !prev)}
            />
          </div>
          <div
            className={`flex ${
              !isActive ? "hidden" : "media960:hidden"
            } items-center gap-2 py-1 pb-2 px-2 rounded-md hover:bg-[#232527]`}
          >
            <h1 className="text-xl">Gemini</h1>
            <MdArrowDropDown className="text-2xl" />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-12">
          <div
            className={`flex items-center gap-4 py-2 ${
              isActive ? "px-3" : "px-2"
            }  bg-[#1A1A1C] rounded-full w-fit`}
            onClick={() => {
              setIsShow(false);
              setIsActive(false);
              setItemId("");
            }}
          >
            <FiPlus className="text-[22px] cursor-pointer text-gray-400" />
            <p
              className={`font-medium text-sm text-gray-400 ${
                !isActive ? "hidden" : ""
              }`}
            >
              New chat
            </p>
          </div>
          <div className={`${!isActive ? "hidden" : ""} animate-fade-in`}>
            <p className="font-medium pt-3 pb-1 ml-3">Recent</p>
            <div id="recent-searches" className="pl-1 h-56 overflow-y-scroll">
              {searchHistory &&
                searchHistory.map(({ id, prompt }) => (
                  <div
                    key={id}
                    onClick={(e) => handleFilter(id)}
                    className={`flex items-center gap-3 cursor-pointer py-[6px] px-3 rounded-full ${
                      id == itemId ? "bg-[#004A77]" : "hover:bg-[#303234]"
                    }`}
                  >
                    <FiMessageSquare />
                    <p className="font-medium text-[14px]">
                      {prompt.slice(0, 32) + (prompt.length > 32 ? "..." : "")}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div
        id="bottom"
        className={`mb-10 cursor-pointer ${isActive ? "pl-1" : ""}`}
      >
        <div className=" flex px-3 gap-3 items-center  py-[6px] hover:bg-[#303234] rounded-full">
          <GrCircleQuestion className="text-lg" />
          <p className={`${!isActive ? "hidden" : ""} font-medium text-[15px]`}>
            Help
          </p>
        </div>
        <div
          className={`flex items-center gap-3 py-[6px] px-3 hover:bg-[#303234] rounded-full`}
        >
          <GoHistory className="text-lg" />
          <p className={`${!isActive ? "hidden" : ""} font-medium text-[15px]`}>
            Activity
          </p>
        </div>
        <div
          className={`flex items-center gap-3 py-[6px] px-3 hover:bg-[#303234] rounded-full`}
        >
          <MdOutlineSettings className="text-lg" />
          <p className={`${!isActive ? "hidden" : ""} font-medium text-[15px]`}>
            Settings
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
