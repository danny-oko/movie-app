"use client";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-800 sm:py-10">
      <aside className="mx-auto w-full md:w-[80vw] max-w-none grid grid-cols-1 gap-8 px-4 sm:px-6 md:px-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 py-6">
        <section className="text-text-white flex flex-col gap-2">
          <p className="font-semibold">🎥 MovieZ</p>
          <p className="text-sm sm:text-base">
            © 2026 Movie Z. All Rights Reserved.
          </p>
        </section>

        <section className="hidden lg:block" aria-hidden />

        <section className="flex flex-col items-start text-text-white font-light gap-2">
          <p className="font-medium">Contact Information</p>
          <div className="flex flex-col font-regular text-sm sm:text-base">
            <p>Email:</p>
            <p className="break-all">danny.otgontsetseg@gmail.com</p>
            <p>Phone:</p>
            <p>+967 80296007</p>
          </div>
        </section>

        <section className="flex text-text-white font-regular flex-col gap-2">
          <p className="font-medium">Follow Me:</p>
          <div className="flex flex-wrap gap-4 sm:justify-between">
            <a
              href="https://www.facebook.com/dnii.dnii.0412"
              className="text-sm sm:text-base hover:underline"
            >
              FaceBook
            </a>
            <a
              href="https://www.instagram.com/dnii_d/"
              className="text-sm sm:text-base hover:underline"
            >
              Instagram
            </a>
            <a className="text-sm sm:text-base hover:underline">Twitter</a>
            <a className="text-sm sm:text-base hover:underline">Youtube</a>
          </div>
        </section>
      </aside>
    </footer>
  );
};

export default Footer;
