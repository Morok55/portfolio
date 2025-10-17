import React, { useState } from "react";
import { FaGithub, FaTelegram, FaWhatsapp  } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
// import { BsFillPersonLinesFill } from "react-icons/bs";

const SocialLinks = () => {
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
          Telegram <FaTelegram size={30} />
        </>
      ),
      href: "https://t.me/unknown955",
      style: "rounded-tr-md",
    },
    {
      id: 2,
      child: (
        <>
          WhatsApp <FaWhatsapp  size={30} />
        </>
      ),
      href: "https://wa.me/79614852184",
    },
    {
      id: 3,
      child: (
        <>
          GitHub <FaGithub size={30} />
        </>
      ),
      href: "https://github.com/Morok55",
    },
    {
      id: 4,
      child: (
        <>
          Почта <HiOutlineMail size={30} />
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
    //     Resume <BsFillPersonLinesFill size={30} />
    //     </>
    //   ),
    //   href: '/FullStack_Developer_DiegoTellez.pdf',
    //   style: 'rounded-br-md',
    //   download: true
    // }
  ];

  return (
    <div className="hidden desktop:flex flex-col top-[35%] left-0 fixed z-30">
      <ul>
        {links.map(({ id, child, href, onClick, style, download }) => (
          <li
            key={id}
            className={
              "flex justify-between items-center w-44 h-14 px-4 bg-primary-color/90 ml-[-116px] duration-500 hover:rounded-md hover:ml-[-10px] " +
              (style ?? "")
            }
          >
            {href ? (
              <a
                href={href}
                className="flex justify-between items-center w-full text-black font-semibold ml-4"
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
                className="flex justify-between items-center w-full text-black font-semibold ml-4"
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

export default SocialLinks;
