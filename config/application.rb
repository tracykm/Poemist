require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

class OliveBranch
  def initialize(app)
    @app = app
  end

  def call(env)
    inflection = 'camel'

    if inflection && env["CONTENT_TYPE"] =~ /application\/json/
      underscore_params(env)
    end

    @app.call(env).tap do |_status, headers, response|
      next unless inflection && headers["Content-Type"] =~ /application\/json/
      response.each do |body|
        begin
          new_response = JSON.parse(body)
        rescue JSON::ParserError
          next
        end

        if inflection == "camel"
          if new_response.is_a? Array
            new_response.each { |o| o.deep_transform_keys! { |k| k.underscore.camelize(:lower)} }
          else
            new_response.deep_transform_keys! { |k| k.underscore.camelize(:lower) }
          end
        elsif inflection == "dash"
          if new_response.is_a? Array
            new_response.each { |o| o.deep_transform_keys!(&:dasherize) }
          else
            new_response.deep_transform_keys!(&:dasherize)
          end
        end

        body.replace(new_response.to_json)
      end
    end
  end

  def underscore_params(env)
    if defined?(Rails) && Rails::VERSION::MAJOR >= 5
      begin
        request_body = JSON.parse(env['rack.input'].read)
        request_body.deep_transform_keys!(&:underscore)
        req = StringIO.new(request_body.to_json)

        env['rack.input']     = req
        env['CONTENT_LENGTH'] = req.length
      rescue JSON::ParserError
      end
    else
      env["action_dispatch.request.request_parameters"].deep_transform_keys!(&:underscore)
    end
  end
end

module Nambynonsense
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.middleware.insert_before 0, "Rack::Cors", :debug => true, :logger => (-> { Rails.logger }) do
      allow do
        origins '*'
        resource '*',
          :headers => :any,
          :methods => [:get, :post, :delete, :put, :patch, :options, :head],
          :max_age => 0
      end
    end

    config.middleware.use(OliveBranch)

    config.generators do |g|
      g.test_framework :rspec,
        :fixtures => false,
        :view_specs => false,
        :helper_specs => false,
        :routing_specs => false,
        :controller_specs => true,
        :request_specs => false
    end

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
  end
end
