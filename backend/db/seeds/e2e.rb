# Seeds for `test` environment

# rubocop:disable Lint/RedundantCopDisableDirective, Layout/HashAlignment, Layout/ExtraSpacing, Layout/LineLength, Style/TrailingCommaInArrayLiteral

# Conferences
Conference.import!(
  [
    { id: 1 },
    { id: 2 }
  ]
)

# Events
Event.import!(
  [
    { id: 1, conference_id: 1, date: Date.new(2022,  7,  1), registration_from: Date.new(2022,  1,  1), registration_to: Date.new(2022,  6,  30), status: 'open'  , auto_assign_reviewers_count: 1 },
    { id: 2, conference_id: 1, date: Date.new(2023,  7,  1), registration_from: Date.new(2023,  1,  1), registration_to: Date.new(2023,  6,  30), status: 'open'  , auto_assign_reviewers_count: 1 },
    { id: 3, conference_id: 1, date: Date.new(2024,  7,  1), registration_from: Date.new(2024,  1,  1), registration_to: Date.new(2024,  6,  30), status: 'hidden', auto_assign_reviewers_count: 1 },

    { id: 4, conference_id: 2, date: Date.new(2022,  9,  1), registration_from: Date.new(2022,  1,  1), registration_to: Date.new(2022,  8,  30), status: 'open'  , auto_assign_reviewers_count: 1 },
    { id: 5, conference_id: 2, date: Date.new(2023,  9,  1), registration_from: Date.new(2023,  1,  1), registration_to: Date.new(2023,  8,  30), status: 'open'  , auto_assign_reviewers_count: 1 },
    { id: 6, conference_id: 2, date: Date.new(2024,  9,  1), registration_from: Date.new(2024,  1,  1), registration_to: Date.new(2024,  8,  30), status: 'hidden', auto_assign_reviewers_count: 1 },
  ]
)

# Language-specific content
Mobility::Backends::ActiveRecord::KeyValue::StringTranslation.import!(
  [
    { id: 1,  translatable_type: 'Conference', translatable_id: 1, key: 'title', locale: 'en', value: 'Security of Information Technologies and Information Systems'      },
    { id: 2,  translatable_type: 'Conference', translatable_id: 1, key: 'title', locale: 'lt', value: 'Informacinių technologijų sauga ir Informacinės sistemos'          },
    { id: 3,  translatable_type: 'Conference', translatable_id: 2, key: 'title', locale: 'en', value: 'Computer Graphics and Designing'                                   },
    { id: 4,  translatable_type: 'Conference', translatable_id: 2, key: 'title', locale: 'lt', value: 'Kompiuterinė grafika ir projektavimas'                             },

    { id: 5,  translatable_type: 'Event',      translatable_id: 1, key: 'title', locale: 'en', value: 'Security of Information Technologies and Information Systems 2022' },
    { id: 6,  translatable_type: 'Event',      translatable_id: 1, key: 'title', locale: 'lt', value: 'Informacinių technologijų sauga ir Informacinės sistemos 2022'     },
    { id: 7,  translatable_type: 'Event',      translatable_id: 2, key: 'title', locale: 'en', value: 'Security of Information Technologies and Information Systems 2023' },
    { id: 8,  translatable_type: 'Event',      translatable_id: 2, key: 'title', locale: 'lt', value: 'Informacinių technologijų sauga ir Informacinės sistemos 2023'     },
    { id: 9,  translatable_type: 'Event',      translatable_id: 3, key: 'title', locale: 'en', value: 'Security of Information Technologies and Information Systems 2024' },
    { id: 10, translatable_type: 'Event',      translatable_id: 3, key: 'title', locale: 'lt', value: 'Informacinių technologijų sauga ir Informacinės sistemos 2024'     },
    { id: 11, translatable_type: 'Event',      translatable_id: 4, key: 'title', locale: 'en', value: 'Computer Graphics and Designing 2022'                              },
    { id: 12, translatable_type: 'Event',      translatable_id: 4, key: 'title', locale: 'lt', value: 'Kompiuterinė grafika ir projektavimas 2022'                        },
    { id: 13, translatable_type: 'Event',      translatable_id: 5, key: 'title', locale: 'en', value: 'Computer Graphics and Designing 2023'                              },
    { id: 14, translatable_type: 'Event',      translatable_id: 5, key: 'title', locale: 'lt', value: 'Kompiuterinė grafika ir projektavimas 2023'                        },
    { id: 15, translatable_type: 'Event',      translatable_id: 6, key: 'title', locale: 'en', value: 'Computer Graphics and Designing 2023'                              },
    { id: 16, translatable_type: 'Event',      translatable_id: 6, key: 'title', locale: 'lt', value: 'Kompiuterinė grafika ir projektavimas 2023'                        },
  ]
)

# Reason: Some text is copy-pasted from external editors
# rubocop:disable Style/StringLiterals

informatics_en_description = "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The conference aim is to provide possibility for young scientists to present their research on the topics of information security and information systems.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We invite bachelor, masters and PhD students, studying at Faculty of Fundamental Sciences, VilniusTech, to present their research on the topics of information security and information systems. We also invite students and young scientists from other faculties and universities, working in that area to share their experience.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Information for participants\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Participants have to prepare ~10 min. presentation on their topic. It is not required to prepare a manuscript.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The best papers can be selected for publication in the Journal \\\"\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":2,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Science - Future of Lithuania\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"\\\".\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizational Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}"
informatics_lt_description = "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apžvalga\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencijos tikslas - suteikti galimybę jauniems mokslininkams pristatyti savo vykdomus tyrimus informacijos saugos ir informacinių sistemų srityse.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Dalyvauti konferencijoje kviečiami VilniusTech Fundamentinių mokslų fakulteto bakalaurai, magistrantai ir doktorantai, vykdantys tyrimus informacijos saugos ir informacinių sistemų tematika. Taip pat kviečiami kitų fakultetų ir universitetų studentai bei jaunieji mokslininkai, dirbantys šiose srityse.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}"
design_en_description = "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The aim of the conference is to provide an opportunity to share information and share your experience in multi-disciplinary fields.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizational Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}"
design_lt_description = "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apžvalga\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencijos tikslas:\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Pateikti naujausius jaunųjų mokslininkų tyrimus CAD bei multimedijos srityje.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}"

Mobility::Backends::ActiveRecord::KeyValue::TextTranslation.import!(
  [
    { id: 1,  translatable_type: 'Conference', translatable_id: 1, key: 'description', locale: 'en', value: informatics_en_description },
    { id: 2,  translatable_type: 'Conference', translatable_id: 1, key: 'description', locale: 'lt', value: informatics_lt_description },
    { id: 3,  translatable_type: 'Conference', translatable_id: 2, key: 'description', locale: 'en', value: design_en_description      },
    { id: 4,  translatable_type: 'Conference', translatable_id: 2, key: 'description', locale: 'lt', value: design_lt_description      },

    { id: 5,  translatable_type: 'Event',      translatable_id: 1, key: 'description', locale: 'en', value: informatics_en_description },
    { id: 6,  translatable_type: 'Event',      translatable_id: 1, key: 'description', locale: 'lt', value: informatics_lt_description },
    { id: 7,  translatable_type: 'Event',      translatable_id: 2, key: 'description', locale: 'en', value: informatics_en_description },
    { id: 8,  translatable_type: 'Event',      translatable_id: 2, key: 'description', locale: 'lt', value: informatics_lt_description },
    { id: 9,  translatable_type: 'Event',      translatable_id: 3, key: 'description', locale: 'en', value: informatics_en_description },
    { id: 10, translatable_type: 'Event',      translatable_id: 3, key: 'description', locale: 'lt', value: informatics_lt_description },
    { id: 11, translatable_type: 'Event',      translatable_id: 4, key: 'description', locale: 'en', value: design_en_description      },
    { id: 12, translatable_type: 'Event',      translatable_id: 4, key: 'description', locale: 'lt', value: design_lt_description      },
    { id: 13, translatable_type: 'Event',      translatable_id: 5, key: 'description', locale: 'en', value: design_en_description      },
    { id: 14, translatable_type: 'Event',      translatable_id: 5, key: 'description', locale: 'lt', value: design_lt_description      },
    { id: 15, translatable_type: 'Event',      translatable_id: 6, key: 'description', locale: 'en', value: design_en_description      },
    { id: 16, translatable_type: 'Event',      translatable_id: 6, key: 'description', locale: 'lt', value: design_lt_description      },
  ]
)

# rubocop:enable Style/StringLiterals

# Users
# Skip validations on User to not generate password digest for each user individually
password_digest = BCrypt::Password.create('password')

# Script used to generate these lines:
# Faker::Config.locale = 'lt'
# puts(Array.new(100) do
#   full_name = "#{Faker::Name.first_name} #{Faker::Name.last_name}"
#   email = "#{I18n.transliterate(full_name).split.map(&:downcase).join('.')}@example.com"
#   "{ full_name: #{"'#{full_name}'".rjust(25)}, email: #{"'#{email}'".rjust(35)}, password_digest:, privilege_level: :default }"
# end.join(",\n"))

User.import!(
  [
    # Administrator
    { id: 1, full_name: 'John Doe',          email: 'admin@example.com',             password_digest:, privilege_level: :admin   },

    # Conference managers
    { id: 2, full_name: 'Jonas Jonaitis',    email: 'jonas.jonaitis@example.com',    password_digest:, privilege_level: :default },
    { id: 3, full_name: 'Alius Jonaitis',    email: 'alius.jonaitis@example.com',    password_digest:, privilege_level: :default },

    # Reviewers
    { id: 4, full_name: 'Petras Petraitis',  email: 'petras.petraitis@example.com',  password_digest:, privilege_level: :default },
    { id: 5, full_name: 'Roberta Jonaitė',   email: 'roberta.jonaite@example.com',   password_digest:, privilege_level: :default },

    # Participants
    { id: 6, full_name: 'Robertas Jonaitis', email: 'robertas.jonaitis@example.com', password_digest:, privilege_level: :default },
  ]
)

# Permissions
Permission.import!(
  [
    { action: 'manage', user_id: 2, target_id: 1, target_type: 'Conference' },
    { action: 'manage', user_id: 3, target_id: 2, target_type: 'Conference' },
  ]
)

# EventReviewers
EventReviewer.import!(
  [
    { id: 1, event_id: 1, reviewer_id: 4 },
    { id: 2, event_id: 2, reviewer_id: 4 },
    { id: 3, event_id: 3, reviewer_id: 4 },

    { id: 4, event_id: 4, reviewer_id: 5 },
    { id: 5, event_id: 5, reviewer_id: 5 },
    { id: 6, event_id: 6, reviewer_id: 5 },
  ]
)

# rubocop:enable Lint/RedundantCopDisableDirective, Layout/HashAlignment, Layout/ExtraSpacing, Layout/LineLength, Style/TrailingCommaInArrayLiteral
