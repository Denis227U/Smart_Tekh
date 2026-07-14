# 🛒 Smart Tekh — интернет-магазин

![CI](https://github.com/Denis227U/Smart_Tekh/actions/workflows/ci.yml/badge.svg)

## 📌 О проекте

Современный и быстрый интернет-магазин, построенный на базе актуального стека технологий с акцентом на высокую производительность, строгую типизацию и поддерживаемую, масштабируемую Feature-Sliced Design архитектуру.

## 🧰 Стек

### Текущий
- **Frontend:** Next.js 16 (App Router + cacheComponents), TypeScript
- **База данных:** Prisma 7, PostgreSQL
- **Хранение файлов:** MinIO (объектное хранилище для статических изображений)
- **Аутентификация:** NextAuth v5 (Credentials, Google and Yandex OAuth), Middleware-защита роутов
- **Валидация:** Zod (клиент + сервер)
- **UI:** Базовые компоненты в shared/ui (Button, Loader, Icon, Container, Modal, Heading, Field, и др.)
- **Архитектура:** Feature-Sliced Design (FSD), строгий порядок импортов (eslint import/order по FSD), строгая валидация .env
- **Инструменты:** ESLint, Prettier, Husky, Commitlint, GitHub Actions, Docker

### В планах
- **Управление состоянием:** Zustand 5 + persist
- **Backend-логика:** Next.js Server Actions
- **Тесты:** Vitest + React Testing Library

## 🏗 Архитектурная структура (FSD)

```text
.
├── app/              # Роутинг Next.js (App Router: layout, page, api)
└── src/              # Исходный FSD код
    ├── app/          # Инициализация приложения, глобальные стили, scss-миксины, провайдеры (SessionProvider), MainLayout
    ├── pages/        # Страницы интернет-магазина (auth)
    ├── widgets/      # Крупные блоки (Header, CatalogDropdown, MobilePanel)
    ├── features/     # Интерактивные действия (аутентификация)
    ├── entities/     # Бизнес-сущности (category, contact, user)
    └── shared/       # Переиспользуемые UI-компоненты, хуки, API-клиенты
```

## 💻 Локальный запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/Denis227U/Smart_Tekh.git
cd Smart_Tekh
```

### 2. Установка зависимостей
```bash
npm install
# или pnpm install / yarn install
```

### 3. Запуск базы данных (Docker Compose)
Запуск базы данных PostgreSQL и объектного хранилища MinIO:
```bash
docker compose up -d
```

### 4. Настройка переменных окружения
Создайте файл `.env` в корне проекта, скопируйте .env.example в .env и заполните необходимые значения:
```env
# База данных (Prisma 7)
DATABASE_URL="postgresql://myuser:mypassword@localhost:5434/mydb?schema=public"
```
*Примечание: myuser, mypassword и mydb — значения по умолчанию из docker-compose.yml

### 5. Миграции базы данных (Prisma 7) и наполнение тестовыми данными
```bash
# Накат миграций из prisma/migrations и генерация Prisma Client
npx prisma migrate dev

# Сидирование базы данных
npx prisma db seed
```

### 6. Запуск сервера разработки
```bash
npm run dev
```
Проект откроется по адресу: `http://localhost:3000`

## 🛡 Аутентификация
- NextAuth v5 с провайдерами Credentials, Google и Yandex
- Защищённые маршруты через Middleware
- Клиентская и серверная валидация форм (Zod)

## 🗺 Roadmap
Ниже — запланированные ключевые шаги.

- [ ] **Основной пользовательский флоу** — каталог с фильтрами, страница товара, поиск, корзина, оформление заказа
- [ ] **Серверная логика** — использование Server Actions для мутаций данных
- [ ] **Расширенная аутентификация** — двухфакторная, восстановление пароля
- [ ] **Локальная корзина** — Zustand 5 + persist для неавторизованных пользователей
- [ ] **Синхронизация корзины** — объединение локальной и серверной корзины при авторизации, сохранение в БД через Server Actions
- [ ] **Интеграция S3 API** — настройка программной загрузки изображений из Next.js в MinIO через SDK
- [ ] **Тесты** — unit/integration (Vitest + React Testing Library)