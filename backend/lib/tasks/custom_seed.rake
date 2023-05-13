require './db/seeds/seed_runner'

namespace :db do
  namespace :seed do
    %i[development e2e].each do |task_name|
      task task_name => :environment do
        # Enable queries logging to console
        ActiveRecord::Base.logger = Logger.new($stdout)

        SeedRunner.call(seed_name: task_name)
      end
    end
  end
end
