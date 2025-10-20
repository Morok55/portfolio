import React, { useState, useMemo, useEffect, useRef } from "react";
import { FiExternalLink } from "react-icons/fi";

// ==== Lightbox (fullscreen viewer) ====
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

export function ModalInfo({ SelectedProject, closeModal, isHiding = false }) {
  // анимация «открытия»: первый кадр opacity-0 → затем 100
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleBackdropClick = () => closeModal();
  const [fsOpen, setFsOpen] = useState(false);
  const handleBackdropIfNoFs = (e) => {
    if (fsOpen) return; // не закрываем модалку кликом по фону, пока открыт лайтбокс
    handleBackdropClick(e);
  };
  const stop = (e) => e.stopPropagation();

  // изображения для модалки
  const images = useMemo(() => {
    if (Array.isArray(SelectedProject?.modalImages) && SelectedProject.modalImages.length > 0) {
      return SelectedProject.modalImages;
    }
    return [SelectedProject?.src].filter(Boolean);
  }, [SelectedProject]);

  // активный кадр
  const [idx, setIdx] = useState(0);
  const canPrev = idx > 0;
  const canNext = idx < images.length - 1;
  const onPrev = () => canPrev && setIdx((i) => i - 1);
  const onNext = () => canNext && setIdx((i) => i + 1);

  // горизонтальная прокрутка миниатюр + переполнение
  const thumbsRef = useRef(null);
  const thumbRefs = useRef([]);
  const getScrollStep = () => {
    const el = thumbsRef.current;
    if (!el) return 0;
    const firstThumb = el.querySelector("[data-thumb='true']");
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    const w = firstThumb ? firstThumb.offsetWidth : 0;
    return w * 2 + gap; // два превью + gap
  };
  const [thumbsOverflow, setThumbsOverflow] = useState(false);
  useEffect(() => {
    const el = thumbsRef.current;
    if (!el) return;
    const check = () => setThumbsOverflow(el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [images.length]);
  const scrollThumbs = (dir) => {
    const step = getScrollStep();
    if (!thumbsRef.current || !step) return;
    thumbsRef.current.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  useEffect(() => {
    const el = thumbRefs.current[idx];
    if (el?.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [idx]);

  // Блокируем прокрутку body, пока модалка смонтирована
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  // ==== Lightbox ====
  const slides = useMemo(() => images.map((src) => ({ src })), [images]);

  // ===== Технологический стек: парсинг строки в удобный вид (НОВОЕ) =====
  const techParsed = useMemo(() => {
    const raw = SelectedProject?.technologies?.trim?.();
    if (!raw) return [];
    // строки вида "Frontend: React, Redux"
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [labelPart, valuePart] = line.split(":");
        const label = (labelPart || "").trim();
        const value = (valuePart || "").trim();
        // делим значения на «бейджи» по запятым
        const items = value ? value.split(",").map((s) => s.trim()).filter(Boolean) : [];
        return { label, items, value };
      });
  }, [SelectedProject?.technologies]);

  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center overscroll-none
                  bg-black/60 supports-[backdrop-filter]:backdrop-blur-sm
                  will-change-[opacity] transition-opacity duration-300
                  ${isHiding || !isVisible ? "opacity-0" : "opacity-100"}`}
      onClick={handleBackdropIfNoFs}
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
        {/* Закрыть */}
        <button
          onClick={closeModal}
          aria-label="Закрыть"
          className="absolute top-0 right-2 z-20 text-red-500 hover:text-red-400 text-3xl leading-none"
        >
          ×
        </button>

        {/* Контент */}
        <div
          className="p-4 md:p-6 overflow-auto max-h-[85vh] overscroll-contain
                     [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Большое изображение + стрелки */}
          <div className="relative">
            <img
              src={images[idx]}
              alt={SelectedProject?.title}
              className="w-full max-h-[52vh] object-contain rounded-xl bg-black/20 cursor-zoom-in"
              onClick={() => setFsOpen(true)}
            />

            {/* градиент под лентой */}
            {images.length > 1 && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-xl bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
            )}

            {/* стрелки полно-высотные */}
            {images.length > 1 && (
              <>
                <button
                  onClick={onPrev}
                  disabled={!canPrev}
                  className="absolute left-0 top-0 h-full w-12 sm:w-14 md:w-16
                             flex items-center justify-center
                             bg-black/0 hover:bg-black/25
                             transition-none disabled:opacity-30 rounded-l-xl"
                  aria-label="Предыдущее изображение"
                >
                  <span className="text-3xl md:text-5xl select-none">‹</span>
                </button>
                <button
                  onClick={onNext}
                  disabled={!canNext}
                  className="absolute right-0 top-0 h-full w-12 sm:w-14 md:w-16
                             flex items-center justify-center
                             bg-black/0 hover:bg-black/25
                             transition-none disabled:opacity-30 rounded-r-xl"
                  aria-label="Следующее изображение"
                >
                  <span className="text-3xl md:text-5xl select-none">›</span>
                </button>
              </>
            )}

            {/* Лента миниатюр */}
            {images.length > 1 && (
              <div className="absolute inset-x-2 bottom-2 z-10">
                <div className="flex items-center gap-2">
                  {thumbsOverflow && (
                    <button
                      type="button"
                      onClick={() => scrollThumbs(-1)}
                      className="h-10 w-8 shrink-0 flex items-center justify-center
                                 rounded-md bg-black/45 hover:bg-black/60
                                 transition-colors duration-75 ease-linear"
                      aria-label="Прокрутить миниатюры влево"
                      title="Влево"
                    >
                      ‹
                    </button>
                  )}

                  <div
                    ref={thumbsRef}
                    className="flex flex-nowrap gap-2 overflow-x-auto grow
                               [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                               px-1 py-1 rounded-md bg-black/35"
                    style={{ scrollSnapType: "x proximity" }}
                  >
                    {images.map((src, i) => (
                      <button
                        type="button"
                        key={src + i}
                        ref={(el) => (thumbRefs.current[i] = el)}
                        data-thumb="true"
                        onClick={() => setIdx(i)}
                        className={`relative h-10 w-14 min-w-[3.5rem] shrink-0 rounded-md overflow-hidden border transition
                                    ${i === idx
                                      ? "opacity-70 border-primary-color"
                                      : "opacity-50 hover:opacity-70 border-white/20 hover:border-white/25"}`}
                        style={{ scrollSnapAlign: "center" }}
                        aria-label={`Показать изображение ${i + 1}`}
                        title={`Изображение ${i + 1}`}
                      >
                        <img
                          src={src}
                          alt={`preview-${i}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {thumbsOverflow && (
                    <button
                      type="button"
                      onClick={() => scrollThumbs(1)}
                      className="h-10 w-8 shrink-0 flex items-center justify-center
                                 rounded-md bg-black/45 hover:bg-black/60
                                 transition-colors duration-75 ease-linear"
                      aria-label="Прокрутить миниатюры вправо"
                      title="Вправо"
                    >
                      ›
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ====== Текстовая часть ====== */}
          <div className="mt-6 space-y-6">
            {/* Заголовок */}
            <h3 className="text-2xl font-semibold text-center">
              {SelectedProject?.title}
            </h3>

            {/* Описание — аккуратно, читабельно (НОВОЕ оформление) */}
            {SelectedProject?.description && (
              <div className="mx-auto">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
                  <div className="text-white/90 leading-relaxed text-base md:text-[17px] whitespace-pre-line text-left">
                    {SelectedProject.description}
                  </div>
                </div>
              </div>
            )}

            {/* Технологический стек — красиво и компактно (НОВОЕ) */}
            {techParsed.length > 0 && (
              <div className="mx-auto">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
                  <h4 className="text-lg font-medium mb-3 text-center md:text-left">
                    Технологический стек
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {techParsed.map(({ label, items, value }, i) => (
                      <div key={i} className="rounded-xl bg-white/4 p-3 border border-white/5">
                        {label && (
                          <div className="text-[12px] uppercase tracking-wide text-white/60 mb-2">
                            {label}
                          </div>
                        )}

                        {/* если удалось распарсить в бейджи — показываем бейджи; иначе — просто текст */}
                        {items.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {items.map((chip, j) => (
                              <span
                                key={j}
                                className="inline-flex items-center rounded-md px-2.5 py-1 text-sm
                                           bg-white/10 ring-1 ring-white/10 text-white/90"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="text-white/90">{value}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {SelectedProject?.demo && (
              <div className="flex justify-center">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={SelectedProject.demo}
                  title="Открыть проект в новой вкладке"
                  className="
                    inline-flex items-center gap-2 cursor-pointer
                    rounded-lg px-4 py-3 lg:px-5 lg:py-4 font-medium
                    text-[1.05rem] lg:text-[1.15rem]
                    text-white/95 transition duration-200
                    hover:scale-105 hover:bg-primary-color hover:text-black
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-color/60
                    active:scale-100
                  "
                >
                  <span className="relative">Открыть проект</span>
                  <FiExternalLink className="relative text-lg opacity-80 group-hover:opacity-100" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== Lightbox: полноэкранный просмотр с зумом/свайпами ===== */}
      <Lightbox
        open={fsOpen}
        close={() => setFsOpen(false)}
        slides={slides}
        index={idx}
        on={{ view: ({ index }) => setIdx(index) }}
        carousel={{ finite: false }}
        render={{ slide: undefined }}
        plugins={[Zoom, Fullscreen]}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
      />
    </section>
  );
}
