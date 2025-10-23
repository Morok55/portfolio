const projects = [
  {
    id: 1,
    title: "Genesis Web",
    description: <>
      <strong>Genesis WEB</strong> — это крипто-аналитическая платформа для трейдеров/инвесторов, показывающая крипто-спреды в реальном времени. 
      Данные агрегируются и разбиты по разделам: DEX-Futures, DEX-Spot, CEX-CEX, Fundings. 
      Для каждого раздела — собственный парсинг монет, спреды, фильтры (по избранному, удалённому, по спреду и по биржам), 
      поиск монет и графики с обновлением каждую секунду.
      <div></div>
      <strong>Реал-тайм:</strong> WebSocket-обновления и агрегация источников для минимальной задержки.
    </>,
    technologies: "Frontend: React, Redux\nBackend/API: Flask (Python), WebSocket для live-обновлений\nПарсинг: Fetch + кастомные скрипты для бэкенда\nКонтроль версий: Git",
    src: "/images/projectsImages/genesis_preview.png",
    demo: "https://genesis-private.com/",
    modalImages: [
      "/images/projectsImages/genesis_preview.png",
      "/images/projectsImages/genesis-1.png",
      "/images/projectsImages/genesis-2.png",
      "/images/projectsImages/genesis-3.png",
      "/images/projectsImages/genesis-4.png",
      "/images/projectsImages/genesis-5.png",
      "/images/projectsImages/genesis-6.png",
      "/images/projectsImages/genesis-7.png",
      "/images/projectsImages/genesis-8.png",
      "/images/projectsImages/genesis-9.png",
      "/images/projectsImages/genesis-10.png",
    ],
  },
  {
    id: 2,
    title: "CarTrader Pro",
    description: <>
      <strong>Car Trader Pro</strong> — это игровое веб-приложение на <strong>React</strong>, интегрированное в <strong>Telegram Mini Apps</strong>.
      В основе лежит полноценная игра с множеством маршрутов и экранов, дополненная стильным дизайном и плавными анимациями.
      Внутри реализована отдельная <strong>оптимизированная 2D-игра</strong>: игрок управляет машиной (у разных машин — разная управляемость), собирает монетки и должен избегать столкновений — при аварии игра заканчивается.
    </>,
    technologies: "Frontend: React, Vite, React Router, Canvas API\nBackend: Flask (Python)\nИнтеграция: Telegram Web App API\nПрочее: Git",
    src: "/images/projectsImages/cartrader_preview.png",
    demo: "https://t.me/CarTraderProBot",
    modalImages: [
      "/images/projectsImages/cartrader.jpg",
      "/images/projectsImages/cartrader-1.jpg",
      "/images/projectsImages/cartrader-2.jpg",
      "/images/projectsImages/cartrader-3.jpg",
      "/images/projectsImages/cartrader-4.jpg",
      "/images/projectsImages/cartrader-5.jpg",
      "/images/projectsImages/cartrader-6.jpg",
      "/images/projectsImages/cartrader-7.jpg",
      "/images/projectsImages/cartrader-8.jpg",
      "/images/projectsImages/cartrader-9.jpg",
      "/images/projectsImages/cartrader-10.jpg",
      "/images/projectsImages/cartrader-11.jpg",
      "/images/projectsImages/cartrader-12.png",
      "/images/projectsImages/cartrader-13.jpg",
      "/images/projectsImages/cartrader-14.jpg",
      "/images/projectsImages/cartrader-15.jpg",
    ],
  },
  {
    id: 3,
    title: "FinAcademia",
    description: <>
      Веб-приложение (сайт), интегрированное в <strong>Telegram Mini App</strong>, которое показывает расписание занятий по всему Финансовому университету. 
      Сделано по заказу руководства вуза. Упор на удобный дизайн, плавные анимации и стабильную работу с API.
      <div></div>
      <strong>Оптимизация:</strong> архитектура и кэширование под высокий трафик — приложение уверенно работает даже на слабом хостинге, что уменьшает расходы на инфраструктуру.
    </>,
    technologies: "Frontend: React, Vite\nBackend/API: Flask (Python), Пользовательские Python-скрипты для подготовки данных\nИнтеграция: Telegram Mini App API\nПрочее: Docker (деплой), Git",
    src: "/images/projectsImages/finacademia_preview.png",
    demo: "https://t.me/FinAcademiaBot",
    modalImages: [
      "/images/projectsImages/finacademia-1.png",
      "/images/projectsImages/finacademia-2.png",
      "/images/projectsImages/finacademia-3.png",
    ],
  },
  {
    id: 4,
    title: "Clicker Game",
    description: <>
      <strong>Clicker App</strong> — это динамичная кликер-игра (веб-приложение) в формате <strong>Telegram Mini App</strong>, 
      вдохновлённая популярными проектами вроде Hamster Combat и Notcoin. 
      Игроки зарабатывают очки кликами и развивают прогресс, но игра не ограничивается только кликером. 
      В ней есть отдельная вкладка с <strong>казино-рулеткой</strong>, где пользователи могут делать ставки и выигрывать, 
      добавляя азарт и разнообразие. Кроме того, реализована система <strong>ежедневных кейсов</strong> — они открываются при входе и приносят бонусы, 
      мотивируя возвращаться каждый день.
    </>,
    technologies: "Frontend: HTML, CSS, JavaScript\nИнтеграция: Telegram Mini App API",
    src: "/images/projectsImages/clicker_preview.png",
    demo: "https://t.me/bytecoin_clicker_bot",
    modalImages: [
      "/images/projectsImages/clicker-1.jpg",
      "/images/projectsImages/clicker-2.jpg",
      "/images/projectsImages/clicker-3.jpg",
      "/images/projectsImages/clicker-4.jpg",
      "/images/projectsImages/clicker-5.jpg",
      "/images/projectsImages/clicker-6.jpg",
      "/images/projectsImages/clicker-7.jpg",
    ],
  },
  {
    id: 5,
    title: "SwapKitty",
    description: <>
      SwapKitty — статический сайт <strong>обменника криптовалют</strong> с реальными курсами к TON. 
      Интегрирован в <strong>Telegram Mini App</strong> для запуска прямо из чата. 
      Упор на скорость загрузки, простую форму обмена и понятный UI без перегрузки.
    </>,
    technologies: "Frontend: HTML, CSS, JavaScript\nПрочее: Telegram Mini App API, Git",
    src: "/images/projectsImages/swapkitty_preview.png",
    demo: "https://t.me/SwapKitty_bot",
    modalImages: [
      "/images/projectsImages/swapkitty-1.jpg",
      "/images/projectsImages/swapkitty-2.jpg",
    ],
  },
  {
    id: 6,
    title: "Калькулятор",
    description: <>
      Web-приложение в <strong>Telegram</strong> на <strong>React</strong>: удобный <strong>калькулятор</strong> с <strong>историей операций</strong> и плавными анимациями.
      Поддерживает все стандартные арифметические действия.
      Интерфейс адаптирован под мобильные экраны, работает быстро и плавно прямо в Telegram.
    </>,
    technologies: "Frontend: React\nПрочее: Telegram Mini App API, Git",
    src: "/images/projectsImages/calculator_preview.png",
    demo: "https://t.me/CalcFastBot",
    modalImages: [
      "/images/projectsImages/calculator-1.jpg",
      "/images/projectsImages/calculator-2.jpg",
    ],
  },
  {
    id: 7,
    title: "Сайт портфолио",
    description: <>
      Персональный <strong>сайт-портфолио</strong> с современным дизайном и акцентом на <strong>удобство навигации</strong>.
      Реализованы плавные анимации, интерактивные блоки и адаптивная верстка для комфортного просмотра на любых устройствах.
      Сайт структурирован по разделам: <strong>проекты</strong>, <strong>технологии</strong>, <strong>образование</strong> и <strong>контакты</strong>.
      Каждый проект оформлен в виде карточки с превью и ссылкой на <strong>демо</strong>.
    </>,
    technologies: "Frontend: React, Vite\nКонтроль версий: Git, GitHub",
    src: "/images/projectsImages/portfolio_preview.png",
    demo: "https://kazadaev-portfolio.vercel.app/",
    modalImages: [
      "/images/projectsImages/portfolio_preview.png",
      "/images/projectsImages/portfolio-1.png",
      "/images/projectsImages/portfolio-2.png",
      "/images/projectsImages/portfolio-3.png",
      "/images/projectsImages/portfolio-4.png",
    ],
  },
];

export default projects;
