# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'capybara/rails'

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # If true, the base class of anonymous controllers will be inferred
  # automatically. This will be the default behavior in future versions of
  # rspec-rails.
  config.infer_base_class_for_anonymous_controllers = false

  config.backtrace_exclusion_patterns = [/\.rvm/, /\.rbenv/]
end

def sign_up(username)
  visit "/users/new"
  fill_in "Username", with: username
  fill_in "Password", with: 'abcdef'
  click_button 'Sign Up'
end

def sign_up_as_ginger_baker
  sign_up("ginger_baker")
end

def sign_in(username)
  visit "/session/new"
  fill_in "Username", with: username
  fill_in "Password", with: 'abcdef'
  click_button 'Sign In'
end

def make_link(title = nil, url = nil)
  title ||= "reddit"
  url ||= "http://www.reddit.com"

  visit "/links/new"
  fill_in 'Title', with: title
  fill_in 'URL', with: url
  click_button "Create New Link"
end
