FactoryBot.define do
  factory :attendance do
    status { 'approved' }
    user { nil }
    event { nil }
  end
end
