import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";

const MobileMenu = ({ open, onClose, links }) => {
  if (typeof document === "undefined") return null;
  return createPortal(
    <>
      {/* Подложка: блюр + затемнение. Закрывается по клику. */}
      <div
        className={[
          "fixed inset-0 z-[100] transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          "supports-[backdrop-filter]:bg-black/55 bg-black/75 backdrop-blur-2xl",
        ].join(" ")}
        onClick={onClose}
        aria-hidden={!open}
      />
      {/* Контент меню по центру, на всю высоту/ширину */}
      <div
        className={[
          "fixed inset-0 z-[110] flex flex-col items-center justify-center text-white",
          "transition-all duration-300",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        onClick={onClose} // клик мимо пунктов закрывает
      >
        {/* Крестик */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 border border-white/10"
          aria-label="Закрыть меню"
        >
          <FaTimes size={24} />
        </button>

        {/* Список ссылок — клики по ним не закрывают подложку, пока мы не обработаем onClick */}
        <ul
          className="w-full max-w-sm px-6 text-center space-y-5"
          onClick={(e) => e.stopPropagation()}
        >
          {links.map(({ id, link, text }) => (
            <li key={id}>
              <Link
                to={link}
                smooth
                duration={500}
                offset={-80}
                onClick={onClose}
                className="block py-3 text-3xl font-medium hover:text-primary-color transition-colors"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>,
    document.body
  );
};

const Navbar = () => {
  const links = [
    { id: 1, link: "Home", text: "Главная" },
    { id: 3, link: "Projects", text: "Проекты" },
    { id: 4, link: "Technologies", text: "Технологии" },
    { id: 5, link: "Education", text: "Образование" },
    { id: 6, link: "Contact", text: "Контакты" },
  ];

  const [isShowNav, setIsShowNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const scrollLockYRef = useRef(0);

  // Хедер (может иметь transform — это ок, меню теперь рендерим вне его)
  const base =
    "fixed top-0 inset-x-0 z-30 mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-24 text-white transition-all duration-300";
  const glass =
    "supports-[backdrop-filter]:bg-black/25 bg-black/35 backdrop-blur-sm backdrop-saturate-150 " +
    "border border-neutral-800/60 shadow-[0_8px_30px_rgba(0,0,0,0.28)] rounded-b-2xl";
  const glassScrolled =
    "supports-[backdrop-filter]:bg-black/30 bg-black/40 border-neutral-700/70 shadow-[0_10px_36px_rgba(0,0,0,0.38)]";

  // hide-on-scroll
  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || 0;
          setIsScrolled(y > 4);
          const lastY = lastYRef.current;
          const goingDown = y > lastY;
          const delta = Math.abs(y - lastY);
          const DELTA = 6;
          if (!isShowNav) {
            if (y < 16) setHidden(false);
            else if (goingDown && y > 80 && delta > DELTA) setHidden(true);
            else if (!goingDown && delta > DELTA) setHidden(false);
          }
          lastYRef.current = y;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isShowNav]);

  // Lock скролла без «прыжков»
  useEffect(() => {
    const body = document.body;
    if (isShowNav) {
      scrollLockYRef.current = window.scrollY || 0;
      const y = scrollLockYRef.current;
      body.style.position = "fixed";
      body.style.top = `-${y}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      setHidden(false);
    } else {
      const y = scrollLockYRef.current;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, y);
    }
  }, [isShowNav]);

  return (
    <>
      <header
        className={[
          base,
          glass,
          isScrolled ? glassScrolled : "",
          hidden ? "-translate-y-full pointer-events-none" : "translate-y-0 pointer-events-auto",
          "will-change-transform",
        ].join(" ")}
      >
        {/* Лого */}
        <div className="relative flex flex-row gap-4 items-center">
          <h1 className="text-[1.1rem] lg:text-[1.3rem]">
            <i className="bx bx-code-curly mr-2 text-base" />
            Портфолио
          </h1>
        </div>

        {/* Desktop меню */}
        <ul className="relative hidden lg:flex">
          {links.map(({ id, link, text }) => (
            <Link key={id} to={link} smooth duration={500}>
                <li className="cursor-pointer hover:scale-105 rounded-lg hover:bg-primary-color p-3 lg:p-4 duration-200 hover:text-black text-[1.05rem] lg:text-[1.15rem]">
                    {text}
                </li>
            </Link>
          ))}
        </ul>

        {/* Бургер */}
        <button
          type="button"
          onClick={() => setIsShowNav(true)}
          className="relative cursor-pointer pr-2 z-40 text-gray-100 lg:hidden"
          aria-label="Открыть меню"
        >
          <FaBars size={28} />
        </button>
      </header>

      {/* Полноэкранное мобильное меню — через портал в body */}
      <MobileMenu open={isShowNav} onClose={() => setIsShowNav(false)} links={links} />
    </>
  );
};

export default Navbar;
