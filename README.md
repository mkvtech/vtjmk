# About

My Bachelor's degree project. VTJMK system. Conference management system. VilniusTech Jaunųjų mokslininkų konferencijos.

Baigiamojo darbo projektas. VTJMK sistema. Konferencijų administravimo sistema. VilniusTech Jaunųjų mokslininkų konferencijos.

# DEMO 🎥

Video just describes better than words, please watch this short 2 minutes demonstration (I WANT U TO WATCH IT):

[![VIDEO DEMONSTRATION ON YOUTUBE](http://img.youtube.com/vi/k0TirDiz6_I/0.jpg)](http://www.youtube.com/watch?v=k0TirDiz6_I)

Direct link: http://www.youtube.com/watch?v=k0TirDiz6_I

# Fast install / Preview

Tested on Windows 10 and Ubuntu 22.04. Git and Docker are required.

```sh
git pull https://github.com/mkvtech/vtjmk.git
cd vtjmk
docker-compose up --build --detach # can take about 5 minutes to build docker image
docker exec vtjmk_backend_dev bundle exec rails db:create db:schema:load db:seed
```

Open app in your browser: http://localhost:5173

Sign in data (more `backend/db/seeds/development.rb`):

| User             | Email                          | Password   |
| ---------------- | ------------------------------ | ---------- |
| Administratorius | `admin@example.com`            | `password` |
| Organizatorius   | `jonas.jonaitis@example.com`   | `password` |
| Recenzentas      | `petras.petraitis@example.com` | `password` |

Reset & seed DB after changes:

```sh
docker exec vtjmk_backend_dev bundle exec rails db:drop db:create db:schema:load db:seed
```

Stop servers when done:

```sh
docker-compose down
```

# Technologies / Naudojamos technologijos

## General

- Git
- Docker
- VSCode
- PostgreSQL
- Ruby on Rails
- NodeJS
- JWT
- Playwright
- GitHub Actions - take a look at [these 4 workflows](https://github.com/mkvtech/vtjmk/tree/main/.github/workflows).
- I18n - EVERYTHING is translated to Lithuanian and English.
- LibreOffice - convert DOCX to PDF.

## Ruby Gems

See: `backend/Gemfile`

- Rails
- RSpec
- Rubocop
- Simplecov
- ActionPolicy - Sending authorization info to frontend.
- ruby-docx - Manipulating DOCX files.
- Mobility - Users can save data in multiple languages.

## JS

See: `frontend/package.json`

- TypeScript
- React
- Vite
- Yarn
- Prettier
- ESLint
- MaterialUI (with their date & time pickers)
- Lexical - RTE.
- i18next
- react-query
- Zod

# Development install:

Tested on Ubuntu 22.04. System requirements: `Git`, `Ruby`, `NodeJS`, `Yarn`, `PostgreSQL`, `LibreOffice`.

```sh
git pull https://github.com/mkvtech/vtjmk.git
cd vtjmk

# In `backend` project...
cd ./backend
bundle install
bundle exec rails db:create db:schema:load db:seed

# In `frontend` project...
cd ../frontend
yarn
```

Backend:

```sh
cd ./backend

# Unit tests
bundle exec rspec

# Test coverage is saved in
xdg-open ./coverage/index.html

# Lint
bundle exec rubocop
```

Frontend:

```sh
cd ./frontend

# Lint
yarn lint
yarn format:check
```

## Integration tests (E2E)

```sh
cd ./e2e

# Install deps
yarn install
yarn playwright install --with-deps

# Prepare server
docker-compose --file ../docker-compose.e2e.yml up --build --detach
docker exec vtjmk_e2e bundle exec rails db:create db:schema:load

# Run tests (3 min)
yarn playwright test
```

# Contact / Kontaktinė informacija

Maksim Kulagin

maksim.kulagin@stud.vilniustech.lt

http://github.com/mkvtech
