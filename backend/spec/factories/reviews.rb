FactoryBot.define do
  factory :review do
    status { :pending }
    comment { 'Comment' }
    participation { nil }
    user { nil }
  end
end
