namespace :db do
  namespace :seed do
    task :development do
      SeedRunner.call(:development)
    end

    task :test do
      SeedRunner.call(:test)
    end
  end
end
