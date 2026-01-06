import React from "react";

const Header = () => {
  return (
    <header className="w-full h-[60px] flex justify-around items-center">
      <h1 className="text-bg-indigo font-bold">🎥 Movie Z</h1>
      <div className="flex gap-2">
        <select className="w-[98px] h-[36px] border border-border-gray rounded-sm">
          <option>Genre</option>
          <aside>
            <h1>Hello</h1>
          </aside>
        </select>
        <input
          type="search"
          placeholder="Search 🔍"
          className="w-[380px] h-[36px] border border-border-gray rounded-sm p-2"
        />
      </div>

      <div className="flex items-center justify-center w-[36px] h-[36px] border border-border-gray rounded-lg">
        ☾
      </div>
    </header>
  );
};

export default Header;
