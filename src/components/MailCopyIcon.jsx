import { useState } from "react";
import { HiMail } from "react-icons/hi";

function MailCopyIcon() {
  const [copied, setCopied] = useState(false);
  const email = "kazadaevalex@yandex.ru";

  const copyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Фолбэк для старых браузеров
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

  return (
    <button
      onClick={copyEmail}
      className="relative text-4xl hover:text-primary-color hover:animate-bounce"
      aria-label="Скопировать почту"
      type="button"
    >
      <HiMail />
      {copied && (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded">
          Скопировано
        </span>
      )}
    </button>
  );
}

export default MailCopyIcon;
