# 🛒 Smart Tekh — интернет-магазин

![CI](https://github.com/Denis227U/Smart_Tekh/actions/workflows/ci.yml/badge.svg)

## 📌 О проекте

Современный и быстрый интернет-магазин, построенный на базе актуального стека технологий с акцентом на высокую производительность, строгую типизацию и поддерживаемую, масштабируемую Feature-Sliced Design архитектуру.

## 🧰 Стек

### Текущий
- **Frontend:** Next.js 16 (App Router + cacheComponents), TypeScript
- **База данных:** Prisma 7, PostgreSQL
- **Архитектура:** Feature-Sliced Design (FSD)
- **Инструменты:** ESLint, Prettier, Husky, Commitlint, GitHub Actions, Docker

### В планах
- **Управление состоянием:** Zustand 5 + persist
- **Backend-логика:** Next.js Server Actions
- **Аутентификация:** Auth.js v5 (ранее NextAuth.js)
- **Хранение файлов:** MinIO

## 🏗 Архитектурная структура (FSD)

```text
src/
├── app/          # Инициализация приложения, глобальные стили, провайдеры (в разработке)
├── pages/        # Страницы интернет-магазина (в разработке)
├── widgets/      # Крупные блоки (в разработке)
├── features/     # Интерактивные действия (в разработке)
├── entities/     # Бизнес-сущности (в разработке)
└── shared/       # Переиспользуемые UI-компоненты, хуки, API-клиенты, scss-миксины (в разработке)
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
```bash
docker compose up -d db
```

### 4. Настройка переменных окружения
Создайте файл `.env` в корне проекта:
```env
# База данных (Prisma 7)
DATABASE_URL="postgresql://myuser:mypassword@localhost:5434/mydb?schema=public"
```
*Примечание: myuser, mypassword и mydb — значения по умолчанию из docker-compose.yml

### 5. Миграции базы данных (Prisma 7)
```bash
npx prisma migrate dev
# для наката миграций из prisma\migrations
```

### 6. Запуск сервера разработки
```bash
npm run dev
```
Проект откроется по адресу: `http://localhost:3000`


## 🗺 Roadmap

Ниже — запланированные ключевые шаги.

- [ ] **Основной пользовательский флоу** — каталог с фильтрами, страница товара, поиск, корзина, оформление заказа
- [ ] **Серверная логика** — переход на Server Actions для мутаций данных
- [ ] **Аутентификация** — Auth.js v5 (Credentials + Google/GitHub провайдеры)
- [ ] **Локальная корзина** — Zustand 5 + persist для неавторизованных пользователей
- [ ] **Синхронизация корзины** — объединение локальной и серверной корзины при авторизации, сохранение в БД через Server Actions
- [ ] **Хранение файлов** — интеграция MinIO для изображений товаров
- [ ] **Тесты** — unit/integration (Vitest + React Testing Library)