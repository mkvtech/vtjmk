module Middleware
  # Adds lag to responses for debug purposes
  class SlowDown
    def initialize(app, args = {})
      @app = app
      @lag_range = args[:lag_range]
      @lag = args[:lag]
      @log = args[:log]
    end

    def call(env)
      sleep_and_log(rand(@lag_range)) if @lag_range
      sleep_and_log(@lag) if @lag

      @app.call(env)
    end

    def sleep_and_log(time)
      Rails.logger.info "Sleeping for #{time} seconds"

      sleep(time)
    end
  end
end
