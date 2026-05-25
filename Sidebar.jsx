import { FaPlus } from "react-icons/fa";
import Machen from "../assets/Machen.png";

function Sidebar({ clearChat }) {

  return (
    <div className="w-[270px] bg-white h-screen p-5 border-r border-slate-300 hidden md:flex flex-col">

      {/* LOGO SECTION */}
      <div className="flex items-center gap-3 mb-8">

        <img
          src={Machen}
          alt="Machen AI"
          className="w-12 h-12 rounded-full object-cover shadow-md"
        />

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Machen AI
          </h1>

          <p className="text-sm text-slate-500">
            Smart Assistant
          </p>
        </div>
      </div>

      {/* NEW CHAT BUTTON */}
      <button
        onClick={clearChat}
        className="w-full bg-slate-100 hover:bg-slate-200 transition-all duration-300 p-3 rounded-xl flex items-center gap-3 text-slate-800 font-medium shadow-sm"
      >
        <FaPlus />
        New Chat
      </button>

      {/* MENU */}
      <div className="mt-10 flex flex-col gap-4">

        <h2 className="text-slate-500 text-sm uppercase tracking-wider">
        Select Here...
        </h2>

        <div className="bg-slate-100 hover:bg-slate-200 transition-all duration-300 p-4 rounded-xl cursor-pointer text-slate-700 font-medium shadow-sm">
           More Features...
        </div>

        <div className="bg-slate-100 hover:bg-slate-200 transition-all duration-300 p-4 rounded-xl cursor-pointer text-slate-700 font-medium shadow-sm">
           Projects...
        </div>

        <div className="bg-slate-100 hover:bg-slate-200 transition-all duration-300 p-4 rounded-xl cursor-pointer text-slate-700 font-medium shadow-sm">
           AI Tools....
        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-auto pt-10 text-sm text-slate-400">
        Powered by Machen AI
      </div>

    </div>
  );
}

export default Sidebar;