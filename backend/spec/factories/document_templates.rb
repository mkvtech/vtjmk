FactoryBot.define do
  factory :document_template, class: 'DocumentTemplate' do
    name { 'Document Template' }
    document_type { 'participation_certificate' }
    placeholder_prefix { '[' }
    placeholder_postfix { ']' }
    conference { nil }
  end
end
