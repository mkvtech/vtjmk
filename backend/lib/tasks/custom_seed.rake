require './db/seeds/seed_runner'

namespace :db do
  namespace :seed do
    task development: :environment do
      SeedRunner.call(seed_name: :development)
    end

    task e2e: :environment do
      SeedRunner.call(seed_name: :e2e)
    end
  end
end
