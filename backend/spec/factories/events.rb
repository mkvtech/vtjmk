FactoryBot.define do
  factory :event do
    title { 'Title' }
    description { 'Description' }
    date { 10.days.from_now }
    attendees_limit { 50 }
    conference { nil }
    registration_from { 5.days.ago }
    registration_to { 5.days.from_now }

    trait :with_conference do
      conference { create(:conference) }
    end
  end
end
