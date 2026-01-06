import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[280px]  flex items-center justify-center bg-bg-indigo">
      <aside className="w-[90%] h-[200px] flex ">
        {/* logo  */}
        <section className="w-1/4 text-text-white flex flex-col gap-2">
          <p className="font-semibold">🎥 MovieZ</p>
          <p>© 2024 Movie Z. All Rights Reserved.</p>
        </section>

        <section className="empty w-1/4 "></section>

        {/* contact information */}
        <section className="w-1/4 flex flex-col items-start text-text-white font-light gap-2">
          <p>Contact Information</p>
          <div className="flex flex-col font-regular">
            <p>Email: </p>
            <p>support@movieZ.com</p>
            <p>Phone:</p>
            <p>+976 (11) 123-4567</p>
          </div>
        </section>

        {/* Social accounts */}
        <section className="w-1/4 flex text-text-white font-regular flex flex-col gap-2">
          <div className="w-full">
            <p>Follow us</p>
          </div>
          <div className="w-full flex justify-between">
            <a>FaceBook</a>
            <a>Instagram</a>
            <a>Twitter</a>
            <a>Youtube</a>
          </div>
        </section>
      </aside>
    </footer>
  );
};

export default Footer;
