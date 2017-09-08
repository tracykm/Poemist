FROM ruby:2.4.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /poemist
WORKDIR /poemist
ADD Gemfile /poemist/Gemfile
ADD Gemfile.lock /poemist/Gemfile.lock
RUN bundle install
ADD . /poemist
