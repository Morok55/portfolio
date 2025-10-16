import React, { useState } from "react";
import { FaGithub, FaTelegram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
// import { BsFillPersonLinesFill } from "react-icons/bs";

const MobileSocialLinks = () => {
  const [copied, setCopied] = useState(false);
  const email = "kazadaevalex@yandex.ru";

  const copyEmail = async (e) => {
    e?.preventDefault?.();
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const links = [
    {
      id: 1,
      child: (
        <>
          <FaTelegram size={20} /> Telegram
        </>
      ),
      href: "https://t.me/unknown955",
      style: "rounded-tr-md",
    },
    {
      id: 2,
      child: (
        <>
          <FaGithub size={20} /> GitHub
        </>
      ),
      href: "https://github.com/Morok55",
    },
    {
      id: 3,
      child: (
        <>
          <HiOutlineMail size={20} /> Почта
        </>
      ),
      // БЫЛО: href: 'mailto:kazadaevalex@yandex.ru'
      onClick: copyEmail,
      style: "rounded-br-md",
    },
    // {
    //   id: 4,
    //   child: (
    //     <>
    //       <BsFillPersonLinesFill size={20} /> Resume
    //     </>
    //   ),
    //   href: '/FullStack_Developer_DiegoTellez.pdf',
    //   style: 'rounded-br-md',
    //   download: true
    // }
  ];

  return (
    <div className="flex mt-4 desktop:hidden">
      <ul className="flex gap-2 flex-wrap justify-center">
        {links.map(({ id, child, href, onClick, style, download }) => (
          <li
            key={id}
            className={
              "flex items-center gap-2 w-28 h-9 px-4 bg-gradient-to-t from-green-400/50 to-primary-color/50 rounded-md " +
              (style ?? "")
            }
          >
            {href ? (
              <a
                href={href}
                className="flex gap-3 items-center w-full text-white text-sm"
                download={download}
                target="_blank"
                rel="noreferrer"
              >
                {child}
              </a>
            ) : (
              <button
                type="button"
                onClick={onClick}
                className="flex gap-3 items-center w-full text-white text-sm"
                aria-label="Скопировать e-mail"
              >
                {child}
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Тост «Скопировано» */}
      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-2 rounded shadow"
        >
          Почта скопирована
        </div>
      )}
    </div>
  );
};

export default MobileSocialLinks;
