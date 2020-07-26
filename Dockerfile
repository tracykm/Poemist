FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev netcat
WORKDIR usr/src
RUN gem install bundler -v 2.1.4
COPY Gemfile* ./
RUN bundle install
COPY . .
CMD ./entrypoint.sh
