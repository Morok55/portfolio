import React, { useMemo } from "react";
import { Link as ScrollLink } from "react-scroll";

const GPA_CURRENT = 95.9;
const GPA_MAX = 100;

const EducationSection = () => {
  const percent = Math.max(0, Math.min(100, (GPA_CURRENT / GPA_MAX) * 100));

  // размеры под разные брейкпоинты
  const sizeSm = 140;  // >= md будет другой
  const sizeMd = 170;
  const stroke = 10;

  const rSm = (sizeSm - stroke) / 2;
  const cSm = 2 * Math.PI * rSm;

  const rMd = (sizeMd - stroke) / 2;
  const cMd = 2 * Math.PI * rMd;

  const dashSm = useMemo(() => {
    const filled = (percent / 100) * cSm;
    return { dasharray: cSm.toFixed(2), dashoffset: (cSm - filled).toFixed(2) };
  }, [percent, cSm]);

  const dashMd = useMemo(() => {
    const filled = (percent / 100) * cMd;
    return { dasharray: cMd.toFixed(2), dashoffset: (cMd - filled).toFixed(2) };
  }, [percent, cMd]);

  return (
    <section name="Education" className="relative w-full min-h-[50vh] md:min-h-[60vh] md:h-screen text-white">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="mb-6 md:mb-8">
          <h2 className="text-4xl font-bold inline border-b-4 border-primary-color/40 sm:text-5xl pb-1">
            Образование
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          {/* Текст */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              Я студент{" "}
              <span className="font-semibold">
                2&nbsp;курса Финансового университета при Правительстве Российской Федерации
              </span>{" "}
              по направлению{" "}
              <span className="italic">«Технологии разработки программного обеспечения»</span>{" "}
              факультета Информационных технологий и анализа больших данных.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              Дополнительно являюсь участником образовательного модуля{" "}
              <span className="font-semibold">с углублённым изучением Web-разработки</span>, 
              что позволяет развивать практические навыки в современных технологиях фронтенда.
            </p>

            <p className="text-lg md:text-xl text-white/90">
              Открыт к проектам и стажировкам, готов обсуждать форматы сотрудничества.
            </p>

            {/* Мобильный бейдж среднего балла (когда круг скрыт) */}
            <div className="md:hidden inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
              <span className="text-sm text-white/70">Средний балл</span>
              <span className="text-base font-semibold tabular-nums lining-nums">
                {GPA_CURRENT} <span className="text-white/60 text-sm">/ {GPA_MAX}</span>
              </span>
            </div>
          </div>

          {/* Круговой индикатор: скрыт на мобильных, виден с md */}
          <div className="hidden md:block justify-self-start md:justify-self-end mt-2 md:mt-0">
            {/* версия для md/lg */}
            <div className="relative" style={{ width: sizeMd, height: sizeMd }}>
              <svg width={sizeMd} height={sizeMd} viewBox={`0 0 ${sizeMd} ${sizeMd}`} className="-rotate-90">
                {/* трек под цвет фона #151616 */}
                <circle
                  cx={sizeMd / 2}
                  cy={sizeMd / 2}
                  r={rMd}
                  fill="none"
                  stroke="#151616"
                  strokeWidth={stroke}
                />
                {/* заполненная дуга (primary) */}
                <circle
                  cx={sizeMd / 2}
                  cy={sizeMd / 2}
                  r={rMd}
                  fill="none"
                  stroke="currentColor"
                  className="text-primary-color transition-[stroke-dashoffset] duration-700 ease-out"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={dashMd.dasharray}
                  strokeDashoffset={dashMd.dashoffset}
                />
              </svg>

              <div className="absolute inset-0 rotate-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold tabular-nums lining-nums">
                  {GPA_CURRENT}
                  <span className="text-white/60 text-lg"> / {GPA_MAX}</span>
                </div>
                <div className="text-sm text-white/60 mt-1">средний балл</div>
                <div className="text-xs text-white/50 mt-0.5 tabular-nums">{percent.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          {/* (опционально) если хочешь всё-таки показать небольшой круг на sm,
              раскомментируй блок ниже и убери мобильный бейдж выше */}
          {/*
          <div className="md:hidden justify-self-start mt-2">
            <div className="relative" style={{ width: sizeSm, height: sizeSm }}>
              <svg width={sizeSm} height={sizeSm} viewBox={`0 0 ${sizeSm} ${sizeSm}`} className="-rotate-90">
                <circle cx={sizeSm/2} cy={sizeSm/2} r={rSm} fill="none" stroke="#151616" strokeWidth={stroke} />
                <circle
                  cx={sizeSm/2}
                  cy={sizeSm/2}
                  r={rSm}
                  fill="none"
                  stroke="currentColor"
                  className="text-primary-color transition-[stroke-dashoffset] duration-700 ease-out"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={dashSm.dasharray}
                  strokeDashoffset={dashSm.dashoffset}
                />
              </svg>
              <div className="absolute inset-0 rotate-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold tabular-nums lining-nums">
                  {GPA_CURRENT}
                  <span className="text-white/60 text-sm"> / {GPA_MAX}</span>
                </div>
                <div className="text-xs text-white/60 mt-1">средний балл</div>
              </div>
            </div>
          </div>
          */}
        </div>
      </div>

      <ScrollLink
        to="Contact"
        smooth
        duration={500}
        className="absolute bottom-2 -left-full md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:text-primary-color"
      >
        <i className="bx bx-chevron-down text-7xl text-gray-400 animate-bounce font hover:text-primary-color"></i>
      </ScrollLink>
    </section>
  );
};

export default EducationSection;
