import React, { useState, useMemo, useEffect } from "react";

export function ModalInfo({ SelectedProject, closeModal, isHiding = false }) {
  // локально управляем видимостью для анимации ОТКРЫТИЯ
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // запускаем на следующий кадр, чтобы первый рендер был opacity-0,
    // а потом плавно перейти в opacity-100
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleBackdropClick = () => closeModal();
  const stop = (e) => e.stopPropagation();

  // Массив картинок для модалки: если есть modalImages — используем их, иначе — превью
  const images = useMemo(() => {
    if (Array.isArray(SelectedProject?.modalImages) && SelectedProject.modalImages.length > 0) {
      return SelectedProject.modalImages;
    }
    return [SelectedProject.src];
  }, [SelectedProject]);

  const [idx, setIdx] = useState(0);
  const canPrev = idx > 0;
  const canNext = idx < images.length - 1;
  const onPrev = () => canPrev && setIdx((i) => i - 1);
  const onNext = () => canNext && setIdx((i) => i + 1);

  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center
                  bg-black/60 supports-[backdrop-filter]:backdrop-blur-sm
                  will-change-[opacity] transition-opacity duration-300
                  ${isHiding || !isVisible ? "opacity-0" : "opacity-100"}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-[92%] sm:w-[80%] max-w-[900px] max-h-[85vh] overflow-hidden rounded-2xl
                    bg-neutral-900 text-white border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.65)]
                    will-change-[opacity] transition-opacity duration-300
                    ${isHiding || !isVisible ? "opacity-0" : "opacity-100"}`}
        onClick={stop}
      >
        {/* Кнопка закрытия — красная «×», без подложки и обводки */}
        <button
          onClick={closeModal}
          aria-label="Закрыть"
          className="absolute top-0 right-2 z-10 text-red-500 hover:text-red-400 text-3xl leading-none"
        >
          ×
        </button>

        {/* Контент с внутренними отступами */}
        <div
          className="p-4 md:p-6 overflow-auto max-h-[85vh]
                    [scrollbar-width:none] [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden"
        >
          {/* Картинка с отступами и скруглением */}
          <div className="relative">
            <img
              src={images[idx]}
              alt={SelectedProject.title}
              className="w-full max-h-[52vh] object-contain rounded-xl bg-black/20"
            />

            {/* Навигация по доп. изображениям (если есть больше 1) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={onPrev}
                  disabled={!canPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10
                             disabled:opacity-30 disabled:hover:bg-white/5 transition"
                >
                  ‹
                </button>
                <button
                  onClick={onNext}
                  disabled={!canNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10
                             disabled:opacity-30 disabled:hover:bg-white/5 transition"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Текстовая часть */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-center mb-4">{SelectedProject.title}</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-primary-color">Описание: </span>
                <span>{SelectedProject.description}</span>
              </li>

              <li>
                <span className="text-primary-color">Технологии: </span>
                <span>{SelectedProject.technologies}</span>
              </li>

              <li>
                <span className="text-primary-color">Ссылка: </span>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline hover:underline-offset-4 transition"
                  href={SelectedProject.demo}
                >
                  Открыть проект
                </a>
              </li>
            </ul>
          </div>

          {/* Мини-превью (если >1 изображения) */}
          {images.length > 1 && (
            <div className="mt-5 grid grid-cols-5 sm:grid-cols-6 gap-2">
              {images.map((src, i) => (
                <button
                  type="button"
                  key={src + i}
                  onClick={() => setIdx(i)}
                  className={`relative h-16 rounded-md overflow-hidden border ${
                    i === idx ? "border-primary-color" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <img src={src} alt={`preview-${i}`} className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
