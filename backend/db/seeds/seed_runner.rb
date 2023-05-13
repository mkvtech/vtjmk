# Does stuff before and after inserting new records into DB
class SeedRunner
  ALLOWED_SEEDS = %w[development e2e].freeze
  IGNORED_TABLES_ON_SEQUENCE_RESET = %w[schema_migrations ar_internal_metadata].freeze

  method_object %i[seed_name!]

  def call
    raise "Unknown seed_name: #{seed_name}" if ALLOWED_SEEDS.exclude?(seed_name.to_s)

    before_seed
    run_seeder
    reset_sequences
  end

  def run_seeder
    filename = Rails.root.join('db', 'seeds', "#{seed_name}.rb")
    load(filename)
  end

  def before_seed
    # Fix RSG (random stuff generator)
    # Faker::Config.random = Random.new(2023)

    # Enable queries logging to console
    ActiveRecord::Base.logger = Logger.new($stdout)
  end

  def reset_sequences
    tables_for_sequence_reset.each do |table|
      sequence = "#{table}_id_seq"

      ActiveRecord::Base.connection.execute(
        <<-SQL.squish
          SELECT SETVAL('#{sequence}', (SELECT MAX(id) FROM #{table}));
        SQL
      )
    end
  end

  def tables_for_sequence_reset
    ActiveRecord::Base.connection.tables.without(IGNORED_TABLES_ON_SEQUENCE_RESET)
  end
end
