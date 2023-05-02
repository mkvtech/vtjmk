FactoryBot.define do
  factory :participation do
    status { 'pending' }
    user { nil }
    event { nil }
  end
end
