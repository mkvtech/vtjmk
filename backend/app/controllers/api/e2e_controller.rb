require './db/seeds/seed_runner'

module Api
  # Utilities for E2E testing
  class E2eController < ApplicationController
    before_action :forbid_production_env

    def db_reset
      DatabaseCleaner.clean_with :truncation

      SeedRunner.call(seed_name: :e2e)
    end

    def time_travel
      Timecop.travel(params[:time])
    end

    def time_return
      Timecop.return
    end
  end
end
