# Development actions
class DebugController < ApplicationController
  # TODO: Disable everything in this controller in production

  # Checks database connection
  def database
    render json: {
      connected: ActiveRecord::Base.connected?
    }
  end
end
