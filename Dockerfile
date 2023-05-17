# Compiles frontend (with `production`) and runs rails server

# Note: see ./frontend/Dockerfile
FROM node:16.19 AS frontend
WORKDIR /vtjmk_frontend

COPY frontend/package.json ./
RUN yarn install

ARG VITE_VTJMK_BACKEND_URL="http://localhost:3000"
ENV VITE_VTJMK_BACKEND_URL=${VITE_VTJMK_BACKEND_URL}

COPY frontend .
RUN yarn build

# Note: see ./backend/Dockerfile
FROM ruby:3.1.2 AS app

# TODO: Use ruby:slim?

WORKDIR /vtjmk_backend

# Install dependencies
RUN apt-get update && \
    apt-get install -y libreoffice

# Install gems
COPY backend/Gemfile .
COPY backend/Gemfile.lock .
RUN bundle install

# Main app
COPY backend .
COPY --from=frontend /vtjmk_frontend/dist ./public

ARG RAILS_ENV=development
ENV RAILS_ENV ${RAILS_ENV}
EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
