FactoryBot.define do
  factory :comment do
    text { 'MyText' }
    user { nil }
    commentable { nil }
  end
end
