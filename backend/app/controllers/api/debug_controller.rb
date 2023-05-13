module Api
  # Utilities for development
  class DebugController < ApplicationController
    before_action :forbid_production_env

    # Checks database connection
    def database
      render json: {
        connected: ActiveRecord::Base.connected?,
        table_count: ActiveRecord::Base.connection.tables.count,
        users_count: ::User.count
      }
    end

    # Returns server time. Useful when manipulating server time
    def time
      render json: { time: Time.zone.now }
    end
  end
end
