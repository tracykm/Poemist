FROM ruby:2.4.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev netcat
WORKDIR usr/src
COPY Gemfile* ./
RUN bundle install
COPY . .
CMD ./entrypoint.sh
