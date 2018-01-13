FROM ruby:2.4.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
WORKDIR /poemist
COPY Gemfile* ./
RUN bundle install
COPY . /poemist
