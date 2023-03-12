FactoryBot.define do
  factory :user do
    sequence(:email) { |i| "test#{i}@example.com" }
    sequence(:full_name) { |i| "John Doe (#{i})" }
    password { 'password' }
  end
end
