import React, { useState } from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail, HiOutlineClipboardCheck } from "react-icons/hi";
import { FiCopy, FiPhone } from "react-icons/fi";

// ЛЕГКО МЕНЯТЬ В ОДНОМ МЕСТЕ:
const TELEGRAM_URL = "https://t.me/unknown955";
const TELEGRAM_USERNAME = "@unknown955";
const EMAIL = "kazadaevalex@yandex.ru";
const PHONE_DISPLAY = "+7 (919) 754-28-85";
const PHONE_COPY = "+79197542885";
const WHATSAPP_URL = "https://wa.me/79614852184";
const WHATSAPP_NUMBER_COPY = "+79614852184";

const Contact = () => {
  const [copied, setCopied] = useState(null); // "email" | "phone" | "tg" | null

  const doCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  // общий стиль «жидкого стекла» (как в Navbar: прозрачный, без белых слоёв)
  const glassCard =
    "supports-[backdrop-filter]:bg-transparent bg-transparent " +
    "backdrop-blur-sm backdrop-saturate-150 " +
    "border border-primary-color/25 rounded-xl " +
    "shadow-[0_8px_30px_rgba(0,0,0,0.18)]";

  const glassBtn =
    "inline-flex items-center gap-2 rounded-md " +
    "border border-primary-color/25 " +
    "px-3 py-2 " +
    "hover:bg-primary-color/10 transition-colors";

  return (
    <section name="Contact" className="relative w-full md:h-screen text-white h-unset">
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="mb-2">
          <h2 className="text-4xl font-bold inline border-b-4 border-primary-color/40 sm:text-5xl">
            Контакты
          </h2>
          <p className="py-6 text-white/90 leading-relaxed">
            Буду рад сотрудничеству и открыт к предложениям. Связаться со мной можно в удобное для вас время:
            пишите в Telegram и WhatsApp (
            <span className="tabular-nums lining-nums whitespace-nowrap">
              +7&nbsp;(961)&nbsp;485-21-84
            </span>
            ), отправляйте письмо на почту или звоните по телефону.
          </p>
        </div>

        <div className="max-w-2xl space-y-4">
          {/* Telegram */}
          <div className={`flex items-center justify-between gap-4 p-3 ${glassCard}`}>
            <div className="flex items-center gap-3">
              <FaTelegramPlane className="text-2xl text-primary-color" />
              <div className="flex flex-col">
                <span className="text-sm text-white/70">Telegram</span>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:underline tabular-nums lining-nums tracking-normal break-all"
                >
                  {TELEGRAM_URL.replace("https://", "")}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => doCopy(TELEGRAM_USERNAME, "tg")}
              className={glassBtn}
              aria-label="Скопировать ссылку на Telegram"
              title="Скопировать"
            >
              {copied === "tg" ? <HiOutlineClipboardCheck className="text-xl" /> : <FiCopy className="text-lg" />}
              <span className="text-sm">Копировать</span>
            </button>
          </div>

          {/* WhatsApp */}
          <div className={`flex items-center justify-between gap-4 p-3 ${glassCard}`}>
            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-2xl text-primary-color" />
              <div className="flex flex-col">
                <span className="text-sm text-white/70">WhatsApp</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:underline tabular-nums lining-nums tracking-normal break-all"
                >
                  {WHATSAPP_URL.replace("https://", "")}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => doCopy(WHATSAPP_NUMBER_COPY, "wa")}
              className={glassBtn}
              aria-label="Скопировать номер WhatsApp"
              title="Скопировать"
            >
              {copied === "wa" ? <HiOutlineClipboardCheck className="text-xl" /> : <FiCopy className="text-lg" />}
              <span className="text-sm">Копировать</span>
            </button>
          </div>

          {/* Email */}
          <div className={`flex items-center justify-between gap-4 p-3 ${glassCard}`}>
            <div className="flex items-center gap-3">
              <HiOutlineMail className="text-2xl text-primary-color" />
              <div className="flex flex-col">
                <span className="text-sm text-white/70">E-mail</span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-semibold hover:underline tabular-nums lining-nums tracking-normal break-all"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => doCopy(EMAIL, "email")}
              className={glassBtn}
              aria-label="Скопировать e-mail"
              title="Скопировать"
            >
              {copied === "email" ? <HiOutlineClipboardCheck className="text-xl" /> : <FiCopy className="text-lg" />}
              <span className="text-sm">Копировать</span>
            </button>
          </div>

          {/* Телефон */}
          <div className={`flex items-center justify-between gap-4 p-3 ${glassCard}`}>
            <div className="flex items-center gap-3">
              <FiPhone className="text-2xl text-primary-color" />
              <div className="flex flex-col">
                <span className="text-sm text-white/70">Телефон</span>
                <a
                  href={`tel:${PHONE_COPY}`}
                  className="font-semibold hover:underline tabular-nums lining-nums tracking-normal"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => doCopy(PHONE_COPY, "phone")}
              className={glassBtn}
              aria-label="Скопировать номер телефона"
              title="Скопировать"
            >
              {copied === "phone" ? <HiOutlineClipboardCheck className="text-xl" /> : <FiCopy className="text-lg" />}
              <span className="text-sm">Копировать</span>
            </button>
          </div>
        </div>

        {/* Тост «Скопировано» — тоже стекло */}
        {copied && (
          <div
            role="status"
            aria-live="polite"
            className={
              "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-2 text-xs text-white rounded " +
              "supports-[backdrop-filter]:bg-transparent bg-transparent " +
              "backdrop-blur-md backdrop-saturate-150 " +
              "border border-primary-color/25 shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
            }
          >
            {copied === "email" && "E-mail скопирован"}
            {copied === "phone" && "Телефон скопирован"}
            {copied === "wa" && "Номер телефона скопирован"}
            {copied === "tg" && "Username скопирован"}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
