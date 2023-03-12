FROM ruby:3.1.2

# PostgresSQL client, for debug
RUN apt-get update && apt-get install -y postgresql-client

# Main app
COPY . /vtjmk
WORKDIR /vtjmk
RUN bundle install

ENV RAILS_ENV development
EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
