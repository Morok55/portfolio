import React from "react";

const ProjectCard = ({ project, handleModalInfo }) => {
  const openModal = () => handleModalInfo(project);

  return (
    <div
      onClick={openModal}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal()}
      className="group cursor-pointer rounded-xl overflow-hidden max-w-md mx-auto
                 shadow-md shadow-gray-700/40 ring-1 ring-white/5
                 transition-transform duration-300 hover:scale-[1.03]
                 hover:ring-primary-color/50 hover:shadow-primary-color/20 hover:shadow-2xl"
      aria-label={`Открыть проект: ${project.title}`}
      title={project.title}
      style={{ transformOrigin: "center" }}
    >
      <div className="relative w-full">
        {/* картинка сама задаёт высоту карточки */}
        <img
          src={project.src}
          alt={project.title}
          className="block w-full h-auto object-cover"
          loading="lazy"
          width={1280}  // можно подставить реальные размеры твоих превью
          height={720}
        />

        {/* Градиент + название проекта вместо кнопки «Открыть демо» */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <h3 className="text-center text-white font-semibold tracking-tight">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
