FROM ruby:3.1.2

WORKDIR /vtjmk_backend

# Install dependencies
RUN apt-get update && \
    apt-get install -y postgresql-client libreoffice

COPY Gemfile /vtjmk_backend/Gemfile
COPY Gemfile.lock /vtjmk_backend/Gemfile.lock
RUN bundle install

# Main app
COPY . .

ENV RAILS_ENV development
EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
