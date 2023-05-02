# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# rubocop:disable Lint/RedundantCopDisableDirective, Layout/HashAlignment, Layout/ExtraSpacing, Layout/LineLength

# Fix random generator
Faker::Config.random = Random.new(2023)

# Enable queries logging to console
ActiveRecord::Base.logger = Logger.new($stdout)

# ApplicationRecord.import! validates all records but inserts all rows in a single query

# Conferences
Conference.import!(
  [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ]
)

# DocumentTemplates
DocumentTemplate.import!(
  [
    {
      id: 1,
      name: 'Participation Certificate (LT) 1',
      conference_id: 1,
      document_type: 'participation_certificate',
      placeholder_prefix: '[',
      placeholder_postfix: ']'
    },
    {
      id: 2,
      name: 'Participation Certificate (EN) 1',
      conference_id: 1,
      document_type: 'participation_certificate',
      placeholder_prefix: '%%',
      placeholder_postfix: '%%'
    },
    {
      id: 3,
      name: 'Participation Certificate (LT) 1',
      conference_id: 2,
      document_type: 'participation_certificate',
      placeholder_prefix: '[',
      placeholder_postfix: ']'
    },
    {
      id: 4,
      name: 'Participation Certificate (EN) 1',
      conference_id: 2,
      document_type: 'participation_certificate',
      placeholder_prefix: '%%',
      placeholder_postfix: '%%'
    },
    {
      id: 5,
      name: 'Participation Certificate (LT) 1',
      conference_id: 3,
      document_type: 'participation_certificate',
      placeholder_prefix: '[',
      placeholder_postfix: ']'
    },
    {
      id: 6,
      name: 'Participation Certificate (EN) 1',
      conference_id: 3,
      document_type: 'participation_certificate',
      placeholder_prefix: '%%',
      placeholder_postfix: '%%'
    },
    {
      id: 7,
      name: 'Participation Certificate (LT) 1',
      conference_id: 4,
      document_type: 'participation_certificate',
      placeholder_prefix: '[',
      placeholder_postfix: ']'
    },
    {
      id: 8,
      name: 'Participation Certificate (EN) 1',
      conference_id: 4,
      document_type: 'participation_certificate',
      placeholder_prefix: '%%',
      placeholder_postfix: '%%'
    }
  ]
)

# Events
Event.import!(
  [
    { id: 1, conference_id: 1, date: Date.new(2022, 2,  5), registration_from: Date.new(2022, 1, 1), registration_to: Date.new(2022, 1, 31), status: 'open'   },
    { id: 2, conference_id: 1, date: Date.new(2023, 5,  5), registration_from: Date.new(2023, 2, 1), registration_to: Date.new(2023, 4, 30), status: 'open'   },
    { id: 3, conference_id: 1, date: Date.new(2024, 2,  1), registration_from: Date.new(2024, 1, 1), registration_to: Date.new(2024, 1, 20), status: 'open'   },
    { id: 4, conference_id: 2, date: Date.new(2022, 10, 1), registration_from: Date.new(2022, 9, 1), registration_to: Date.new(2022, 9, 30), status: 'open'   },
    { id: 5, conference_id: 2, date: Date.new(2023, 10, 1), registration_from: Date.new(2023, 9, 1), registration_to: Date.new(2023, 9, 30), status: 'open'   },
    { id: 6, conference_id: 3, date: Date.new(2024, 2,  1), registration_from: Date.new(2024, 1, 1), registration_to: Date.new(2024, 1, 31), status: 'open'   },
    { id: 7, conference_id: 4, date: Date.new(2023, 5,  1), registration_from: Date.new(2022, 4, 1), registration_to: Date.new(2022, 4, 20), status: 'open'   },
    { id: 8, conference_id: 4, date: Date.new(2024, 5,  1), registration_from: Date.new(2022, 4, 1), registration_to: Date.new(2022, 4, 20), status: 'hidden' }
  ]
)

# Language-specific content
Mobility::Backends::ActiveRecord::KeyValue::StringTranslation.import!(
  [
    { id: 1,  translatable_type: 'Conference', translatable_id: 1, key: 'title', locale: 'en', value: 'Security of Information Technologies and Information Systems'       },
    { id: 2,  translatable_type: 'Conference', translatable_id: 1, key: 'title', locale: 'lt', value: 'Informacinių technologijų sauga ir Informacinės sistemos'           },
    { id: 3,  translatable_type: 'Conference', translatable_id: 2, key: 'title', locale: 'en', value: 'Computer Graphics and Designing'                                    },
    { id: 4,  translatable_type: 'Conference', translatable_id: 2, key: 'title', locale: 'lt', value: 'Kompiuterinė grafika ir projektavimas'                              },
    { id: 5,  translatable_type: 'Conference', translatable_id: 3, key: 'title', locale: 'en', value: 'Mechanics, Material Science, Industrial Engineering and Management' },
    { id: 6,  translatable_type: 'Conference', translatable_id: 3, key: 'title', locale: 'lt', value: 'Mechanika, medžiagų inžinerija, pramonės inžinerija ir vadyba'      },
    { id: 7,  translatable_type: 'Conference', translatable_id: 4, key: 'title', locale: 'en', value: 'Economics and Management'                                           },
    { id: 8,  translatable_type: 'Conference', translatable_id: 4, key: 'title', locale: 'lt', value: 'Ekonomika ir vadyba'                                                },

    { id: 9,  translatable_type: 'Event', translatable_id: 1, key: 'title', locale: 'en', value: 'Security of Information Technologies and Information Systems 2022'       },
    { id: 10, translatable_type: 'Event', translatable_id: 1, key: 'title', locale: 'lt', value: 'Informacinių technologijų sauga ir Informacinės sistemos 2022'           },
    { id: 11, translatable_type: 'Event', translatable_id: 2, key: 'title', locale: 'en', value: 'Security of Information Technologies and Information Systems 2023'       },
    { id: 12, translatable_type: 'Event', translatable_id: 2, key: 'title', locale: 'lt', value: 'Informacinių technologijų sauga ir Informacinės sistemos 2023'           },
    { id: 13, translatable_type: 'Event', translatable_id: 3, key: 'title', locale: 'en', value: 'Security of Information Technologies and Information Systems 2024'       },
    { id: 14, translatable_type: 'Event', translatable_id: 3, key: 'title', locale: 'lt', value: 'Informacinių technologijų sauga ir Informacinės sistemos 2024'           },

    { id: 15, translatable_type: 'Event', translatable_id: 4, key: 'title', locale: 'en', value: 'Computer Graphics and Designing 2022'                                    },
    { id: 16, translatable_type: 'Event', translatable_id: 4, key: 'title', locale: 'lt', value: 'Kompiuterinė grafika ir projektavimas 2022'                              },
    { id: 17, translatable_type: 'Event', translatable_id: 5, key: 'title', locale: 'en', value: 'Computer Graphics and Designing 2023'                                    },
    { id: 18, translatable_type: 'Event', translatable_id: 5, key: 'title', locale: 'lt', value: 'Kompiuterinė grafika ir projektavimas 2023'                              },

    { id: 19, translatable_type: 'Event', translatable_id: 6, key: 'title', locale: 'en', value: 'Mechanics, Material Science, Industrial Engineering and Management 2024' },
    { id: 20, translatable_type: 'Event', translatable_id: 6, key: 'title', locale: 'lt', value: 'Mechanika, medžiagų inžinerija, pramonės inžinerija ir vadyba 2024'      },

    { id: 21, translatable_type: 'Event', translatable_id: 7, key: 'title', locale: 'en', value: 'Economics and Management 2023'                                           },
    { id: 22, translatable_type: 'Event', translatable_id: 7, key: 'title', locale: 'lt', value: 'Ekonomika ir vadyba 2023'                                                },
    { id: 23, translatable_type: 'Event', translatable_id: 8, key: 'title', locale: 'en', value: 'Economics and Management 2024'                                           },
    { id: 24, translatable_type: 'Event', translatable_id: 8, key: 'title', locale: 'lt', value: 'Ekonomika ir vadyba 2024'                                                }
  ]
)

# Reason: Some text is copy-pasted from external editors
# rubocop:disable Style/StringLiterals

Mobility::Backends::ActiveRecord::KeyValue::TextTranslation.import!(
  [
    { id: 1,  translatable_type: 'Conference', translatable_id: 1, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The conference aim is to provide possibility for young scientists to present their research on the topics of information security and information systems.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We invite bachelor, masters and PhD students, studying at Faculty of Fundamental Sciences, VilniusTech, to present their research on the topics of information security and information systems. We also invite students and young scientists from other faculties and universities, working in that area to share their experience.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Information for participants\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Participants have to prepare ~10 min. presentation on their topic. It is not required to prepare a manuscript.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The best papers can be selected for publication in the Journal \\\"\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":2,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Science - Future of Lithuania\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"\\\".\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizational Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 2,  translatable_type: 'Conference', translatable_id: 1, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apžvalga\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencijos tikslas - suteikti galimybę jauniems mokslininkams pristatyti savo vykdomus tyrimus informacijos saugos ir informacinių sistemų srityse.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Dalyvauti konferencijoje kviečiami VilniusTech Fundamentinių mokslų fakulteto bakalaurai, magistrantai ir doktorantai, vykdantys tyrimus informacijos saugos ir informacinių sistemų tematika. Taip pat kviečiami kitų fakultetų ir universitetų studentai bei jaunieji mokslininkai, dirbantys šiose srityse.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 3,  translatable_type: 'Conference', translatable_id: 2, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The aim of the conference is to provide an opportunity to share information and share your experience in multi-disciplinary fields.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizational Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 4,  translatable_type: 'Conference', translatable_id: 2, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apžvalga\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencijos tikslas:\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Pateikti naujausius jaunųjų mokslininkų tyrimus CAD bei multimedijos srityje.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 5,  translatable_type: 'Conference', translatable_id: 3, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About Conference\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The aim of the conference is to provide an opportunity to share information and share your experience in multi-disciplinary fields.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 6,  translatable_type: 'Conference', translatable_id: 3, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apie konferenciją\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencija vyks lietuvių ir anglų kalbomis. Pranešimų medžiaga publikuojama lietuvių arba anglų kalba.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kviečiame dalyvauti doktorantus, magistrantus, bakalaurantus ir kitus jaunuosius mokslininkus.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 7,  translatable_type: 'Conference', translatable_id: 4, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About the Conference\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We are delighted to invite young scientists, doctoral, postgraduate and undergraduate students, and their supervisors to participate in the 26th Scientific Conference for Young Researchers \\\"Economics and Management\\\". The Conference offers a platform where researchers could share their research results and discuss new scientific ideas.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizing Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 8,  translatable_type: 'Conference', translatable_id: 4, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About the Conference\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We are delighted to invite young scientists, doctoral, postgraduate and undergraduate students, and their supervisors to participate in the 26th Scientific Conference for Young Researchers \\\"Economics and Management\\\". The Conference offers a platform where researchers could share their research results and discuss new scientific ideas.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizing Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },

    { id: 9,  translatable_type: 'Event', translatable_id: 1, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The conference aim is to provide possibility for young scientists to present their research on the topics of information security and information systems.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We invite bachelor, masters and PhD students, studying at Faculty of Fundamental Sciences, VilniusTech, to present their research on the topics of information security and information systems. We also invite students and young scientists from other faculties and universities, working in that area to share their experience.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Information for participants\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Participants have to prepare ~10 min. presentation on their topic. It is not required to prepare a manuscript.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The best papers can be selected for publication in the Journal \\\"\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":2,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Science - Future of Lithuania\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"\\\".\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizational Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 10, translatable_type: 'Event', translatable_id: 1, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apžvalga\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencijos tikslas - suteikti galimybę jauniems mokslininkams pristatyti savo vykdomus tyrimus informacijos saugos ir informacinių sistemų srityse.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Dalyvauti konferencijoje kviečiami VilniusTech Fundamentinių mokslų fakulteto bakalaurai, magistrantai ir doktorantai, vykdantys tyrimus informacijos saugos ir informacinių sistemų tematika. Taip pat kviečiami kitų fakultetų ir universitetų studentai bei jaunieji mokslininkai, dirbantys šiose srityse.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 11, translatable_type: 'Event', translatable_id: 2, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The conference aim is to provide possibility for young scientists to present their research on the topics of information security and information systems.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We invite bachelor, masters and PhD students, studying at Faculty of Fundamental Sciences, VilniusTech, to present their research on the topics of information security and information systems. We also invite students and young scientists from other faculties and universities, working in that area to share their experience.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Information for participants\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Participants have to prepare ~10 min. presentation on their topic. It is not required to prepare a manuscript.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The best papers can be selected for publication in the Journal \\\"\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":2,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Science - Future of Lithuania\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"\\\".\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizational Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 12, translatable_type: 'Event', translatable_id: 2, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apžvalga\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencijos tikslas - suteikti galimybę jauniems mokslininkams pristatyti savo vykdomus tyrimus informacijos saugos ir informacinių sistemų srityse.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Dalyvauti konferencijoje kviečiami VilniusTech Fundamentinių mokslų fakulteto bakalaurai, magistrantai ir doktorantai, vykdantys tyrimus informacijos saugos ir informacinių sistemų tematika. Taip pat kviečiami kitų fakultetų ir universitetų studentai bei jaunieji mokslininkai, dirbantys šiose srityse.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 13, translatable_type: 'Event', translatable_id: 3, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The conference aim is to provide possibility for young scientists to present their research on the topics of information security and information systems.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We invite bachelor, masters and PhD students, studying at Faculty of Fundamental Sciences, VilniusTech, to present their research on the topics of information security and information systems. We also invite students and young scientists from other faculties and universities, working in that area to share their experience.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Information for participants\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Participants have to prepare ~10 min. presentation on their topic. It is not required to prepare a manuscript.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The best papers can be selected for publication in the Journal \\\"\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":2,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Science - Future of Lithuania\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"\\\".\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizational Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 14, translatable_type: 'Event', translatable_id: 3, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apžvalga\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencijos tikslas - suteikti galimybę jauniems mokslininkams pristatyti savo vykdomus tyrimus informacijos saugos ir informacinių sistemų srityse.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Dalyvauti konferencijoje kviečiami VilniusTech Fundamentinių mokslų fakulteto bakalaurai, magistrantai ir doktorantai, vykdantys tyrimus informacijos saugos ir informacinių sistemų tematika. Taip pat kviečiami kitų fakultetų ir universitetų studentai bei jaunieji mokslininkai, dirbantys šiose srityse.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },

    { id: 15, translatable_type: 'Event', translatable_id: 4, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The aim of the conference is to provide an opportunity to share information and share your experience in multi-disciplinary fields.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizational Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 16, translatable_type: 'Event', translatable_id: 4, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apžvalga\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencijos tikslas:\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Pateikti naujausius jaunųjų mokslininkų tyrimus CAD bei multimedijos srityje.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 17, translatable_type: 'Event', translatable_id: 5, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The aim of the conference is to provide an opportunity to share information and share your experience in multi-disciplinary fields.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizational Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 18, translatable_type: 'Event', translatable_id: 5, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apžvalga\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencijos tikslas:\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Pateikti naujausius jaunųjų mokslininkų tyrimus CAD bei multimedijos srityje.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },

    { id: 19, translatable_type: 'Event', translatable_id: 6, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About Conference\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The aim of the conference is to provide an opportunity to share information and share your experience in multi-disciplinary fields.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 20, translatable_type: 'Event', translatable_id: 6, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Apie konferenciją\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Konferencija vyks lietuvių ir anglų kalbomis. Pranešimų medžiaga publikuojama lietuvių arba anglų kalba.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kviečiame dalyvauti doktorantus, magistrantus, bakalaurantus ir kitus jaunuosius mokslininkus.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kontaktai\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Mokslo komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizacinis komitetas\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },

    { id: 21, translatable_type: 'Event', translatable_id: 7, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About the Conference\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We are delighted to invite young scientists, doctoral, postgraduate and undergraduate students, and their supervisors to participate in the 26th Scientific Conference for Young Researchers \\\"Economics and Management\\\". The Conference offers a platform where researchers could share their research results and discuss new scientific ideas.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizing Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 22, translatable_type: 'Event', translatable_id: 7, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About the Conference\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We are delighted to invite young scientists, doctoral, postgraduate and undergraduate students, and their supervisors to participate in the 26th Scientific Conference for Young Researchers \\\"Economics and Management\\\". The Conference offers a platform where researchers could share their research results and discuss new scientific ideas.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizing Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 23, translatable_type: 'Event', translatable_id: 8, key: 'description', locale: 'en', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About the Conference\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We are delighted to invite young scientists, doctoral, postgraduate and undergraduate students, and their supervisors to participate in the 26th Scientific Conference for Young Researchers \\\"Economics and Management\\\". The Conference offers a platform where researchers could share their research results and discuss new scientific ideas.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizing Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" },
    { id: 24, translatable_type: 'Event', translatable_id: 8, key: 'description', locale: 'lt', value: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"About the Conference\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"We are delighted to invite young scientists, doctoral, postgraduate and undergraduate students, and their supervisors to participate in the 26th Scientific Conference for Young Researchers \\\"Economics and Management\\\". The Conference offers a platform where researchers could share their research results and discuss new scientific ideas.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Contacts\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Scientific Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Organizing Committee\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}" }
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
    { id:  1, full_name:                'John Doe', email:                 'admin@example.com', password_digest:, privilege_level:   :admin },

    # Conference managers
    { id:  2, full_name:         'Eugenija Pouros', email:       'eugenija.pouros@example.com', password_digest:, privilege_level: :default },
    { id:  3, full_name:            'Alius Spinka', email:          'alius.spinka@example.com', password_digest:, privilege_level: :default },
    { id:  4, full_name:           'Agnė Reynolds', email:         'agne.reynolds@example.com', password_digest:, privilege_level: :default },

    { id:  5, full_name:         'Simonas Dibbert', email:       'simonas.dibbert@example.com', password_digest:, privilege_level: :default },
    { id:  6, full_name:             'Vida Heaney', email:           'vida.heaney@example.com', password_digest:, privilege_level: :default },

    { id:  7, full_name:            'Juozas Adams', email:          'juozas.adams@example.com', password_digest:, privilege_level: :default },

    # Reviewers
    { id:  8, full_name:             'Valys Wolff', email:           'valys.wolff@example.com', password_digest:, privilege_level: :default },
    { id:  9, full_name:              'Vida Kunde', email:            'vida.kunde@example.com', password_digest:, privilege_level: :default },
    { id: 10, full_name:       'Kristina McKenzie', email:     'kristina.mckenzie@example.com', password_digest:, privilege_level: :default },

    { id: 11, full_name:        'Roberta Johnston', email:      'roberta.johnston@example.com', password_digest:, privilege_level: :default },
    { id: 12, full_name:         'Karolis Corkery', email:       'karolis.corkery@example.com', password_digest:, privilege_level: :default },
    { id: 13, full_name:          'Enrika Mueller', email:        'enrika.mueller@example.com', password_digest:, privilege_level: :default },
    { id: 14, full_name:          'Renata McClure', email:        'renata.mcclure@example.com', password_digest:, privilege_level: :default },

    { id: 15, full_name:         'Arnas Considine', email:       'arnas.considine@example.com', password_digest:, privilege_level: :default },
    { id: 16, full_name:        'Jomantė Jacobson', email:      'jomante.jacobson@example.com', password_digest:, privilege_level: :default },

    { id: 17, full_name:          'Vitalija Wolff', email:        'vitalija.wolff@example.com', password_digest:, privilege_level: :default },

    # Participants
    { id: 18, full_name:         'Silvija Keeling', email:       'silvija.keeling@example.com', password_digest:, privilege_level: :default },
    { id: 19, full_name:     'Modesta Oberbrunner', email:   'modesta.oberbrunner@example.com', password_digest:, privilege_level: :default },
    { id: 20, full_name:       'Elžbieta Reichert', email:     'elzbieta.reichert@example.com', password_digest:, privilege_level: :default },
    { id: 21, full_name:      'Prančiškus Wiegand', email:    'pranciskus.wiegand@example.com', password_digest:, privilege_level: :default },
    { id: 22, full_name:        'Beatričė Roberts', email:      'beatrice.roberts@example.com', password_digest:, privilege_level: :default },
    { id: 23, full_name:         'Vidas Gutkowski', email:       'vidas.gutkowski@example.com', password_digest:, privilege_level: :default },
    { id: 24, full_name:         'Benediktas Rice', email:       'benediktas.rice@example.com', password_digest:, privilege_level: :default },
    { id: 25, full_name:              'Arnas Hane', email:            'arnas.hane@example.com', password_digest:, privilege_level: :default },
    { id: 26, full_name:      'Enrika Breitenberg', email:    'enrika.breitenberg@example.com', password_digest:, privilege_level: :default },
    { id: 27, full_name:           'Milda Wuckert', email:         'milda.wuckert@example.com', password_digest:, privilege_level: :default },
    { id: 28, full_name:            'Vida Waelchi', email:          'vida.waelchi@example.com', password_digest:, privilege_level: :default },
    { id: 29, full_name:            'Algis Walker', email:          'algis.walker@example.com', password_digest:, privilege_level: :default },
    { id: 30, full_name:      'Cecilija Aufderhar', email:    'cecilija.aufderhar@example.com', password_digest:, privilege_level: :default },
    { id: 31, full_name:         'Jūratė Mitchell', email:       'jurate.mitchell@example.com', password_digest:, privilege_level: :default },
    { id: 32, full_name:             'Stasė Yundt', email:           'stase.yundt@example.com', password_digest:, privilege_level: :default },
    { id: 33, full_name:          'Brigita Skiles', email:        'brigita.skiles@example.com', password_digest:, privilege_level: :default },
    { id: 34, full_name:    'Stefanija Macejkovic', email:  'stefanija.macejkovic@example.com', password_digest:, privilege_level: :default },
    { id: 35, full_name:         'Danielius Price', email:       'danielius.price@example.com', password_digest:, privilege_level: :default },
    { id: 36, full_name:            'Agnė Ullrich', email:          'agne.ullrich@example.com', password_digest:, privilege_level: :default },
    { id: 37, full_name:           'Loreta Brekke', email:         'loreta.brekke@example.com', password_digest:, privilege_level: :default },
    { id: 38, full_name:        'Karolina Windler', email:      'karolina.windler@example.com', password_digest:, privilege_level: :default },
    { id: 39, full_name:      'Benediktas Trantow', email:    'benediktas.trantow@example.com', password_digest:, privilege_level: :default },
    { id: 40, full_name:            'Saulė Legros', email:          'saule.legros@example.com', password_digest:, privilege_level: :default },
    { id: 41, full_name:      'Ernestas Romaguera', email:    'ernestas.romaguera@example.com', password_digest:, privilege_level: :default },
    { id: 42, full_name:         'Danielius Welch', email:       'danielius.welch@example.com', password_digest:, privilege_level: :default },
    { id: 43, full_name:      'Prančiškus Goyette', email:    'pranciskus.goyette@example.com', password_digest:, privilege_level: :default },
    { id: 44, full_name:          'Henrikas Sauer', email:        'henrikas.sauer@example.com', password_digest:, privilege_level: :default },
    { id: 45, full_name:           'Brigita Marks', email:         'brigita.marks@example.com', password_digest:, privilege_level: :default },
    { id: 46, full_name:             'Gintė Crist', email:           'ginte.crist@example.com', password_digest:, privilege_level: :default },
    { id: 47, full_name:           'Juozapas Hahn', email:         'juozapas.hahn@example.com', password_digest:, privilege_level: :default },
    { id: 48, full_name:       'Benedikta Steuber', email:     'benedikta.steuber@example.com', password_digest:, privilege_level: :default },
    { id: 49, full_name:          'Audrius Harris', email:        'audrius.harris@example.com', password_digest:, privilege_level: :default },
    { id: 50, full_name:         'Ernestas Brakus', email:       'ernestas.brakus@example.com', password_digest:, privilege_level: :default },
    { id: 51, full_name:             'Kazys Boehm', email:           'kazys.boehm@example.com', password_digest:, privilege_level: :default },
    { id: 52, full_name:            'Stasė Heaney', email:          'stase.heaney@example.com', password_digest:, privilege_level: :default },
    { id: 53, full_name:          'Enrikas Brekke', email:        'enrikas.brekke@example.com', password_digest:, privilege_level: :default },
    { id: 54, full_name:           'Simona Miller', email:         'simona.miller@example.com', password_digest:, privilege_level: :default },
    { id: 55, full_name:       'Benedikta Watsica', email:     'benedikta.watsica@example.com', password_digest:, privilege_level: :default },
    { id: 56, full_name:         'Renatas Streich', email:       'renatas.streich@example.com', password_digest:, privilege_level: :default },
    { id: 57, full_name:         'Mečislovas Veum', email:       'mecislovas.veum@example.com', password_digest:, privilege_level: :default },
    { id: 58, full_name:        'Justas Dickinson', email:      'justas.dickinson@example.com', password_digest:, privilege_level: :default },
    { id: 59, full_name:        'Karolina Ziemann', email:      'karolina.ziemann@example.com', password_digest:, privilege_level: :default },
    { id: 60, full_name:         'Mykolas Hilpert', email:       'mykolas.hilpert@example.com', password_digest:, privilege_level: :default },
    { id: 61, full_name:          'Silvija Fisher', email:        'silvija.fisher@example.com', password_digest:, privilege_level: :default },
    { id: 62, full_name:           'Barbora Mayer', email:         'barbora.mayer@example.com', password_digest:, privilege_level: :default },
    { id: 63, full_name:        'Eugenija Padberg', email:      'eugenija.padberg@example.com', password_digest:, privilege_level: :default },
    { id: 64, full_name:         'Arminas Roberts', email:       'arminas.roberts@example.com', password_digest:, privilege_level: :default },
    { id: 65, full_name:       'Florijonas Waters', email:     'florijonas.waters@example.com', password_digest:, privilege_level: :default },
    { id: 66, full_name:              'Romas Howe', email:            'romas.howe@example.com', password_digest:, privilege_level: :default },
    { id: 67, full_name:         'Adolfas Koelpin', email:       'adolfas.koelpin@example.com', password_digest:, privilege_level: :default },
    { id: 68, full_name:      'Aleksandras Rippin', email:    'aleksandras.rippin@example.com', password_digest:, privilege_level: :default },
    { id: 69, full_name:      'Jomantas Armstrong', email:    'jomantas.armstrong@example.com', password_digest:, privilege_level: :default },
    { id: 70, full_name:           'Arnas Friesen', email:         'arnas.friesen@example.com', password_digest:, privilege_level: :default },
    { id: 71, full_name:            'Jomantė Rath', email:          'jomante.rath@example.com', password_digest:, privilege_level: :default },
    { id: 72, full_name:       'Valdemaras Glover', email:     'valdemaras.glover@example.com', password_digest:, privilege_level: :default },
    { id: 73, full_name:        'Prančiškus Bauch', email:      'pranciskus.bauch@example.com', password_digest:, privilege_level: :default },
    { id: 74, full_name:      'Genovaitė Lindgren', email:    'genovaite.lindgren@example.com', password_digest:, privilege_level: :default },
    { id: 75, full_name:         'Gintarė Bartell', email:       'gintare.bartell@example.com', password_digest:, privilege_level: :default },
    { id: 76, full_name:          'Vaidas McClure', email:        'vaidas.mcclure@example.com', password_digest:, privilege_level: :default },
    { id: 77, full_name:           'Dalia Treutel', email:         'dalia.treutel@example.com', password_digest:, privilege_level: :default },
    { id: 78, full_name:      'Danielius Luettgen', email:    'danielius.luettgen@example.com', password_digest:, privilege_level: :default },
    { id: 79, full_name:       'Genovaitė Trantow', email:     'genovaite.trantow@example.com', password_digest:, privilege_level: :default },
    { id: 80, full_name:      'Austėja Swaniawski', email:    'austeja.swaniawski@example.com', password_digest:, privilege_level: :default },
    { id: 81, full_name:        'Zenonas Weissnat', email:      'zenonas.weissnat@example.com', password_digest:, privilege_level: :default },
    { id: 82, full_name:              'Rožė Kunze', email:            'roze.kunze@example.com', password_digest:, privilege_level: :default },
    { id: 83, full_name:         'Jogaila Smitham', email:       'jogaila.smitham@example.com', password_digest:, privilege_level: :default },
    { id: 84, full_name:          'Toma VonRueden', email:        'toma.vonrueden@example.com', password_digest:, privilege_level: :default },
    { id: 85, full_name:         'Beatričė Howell', email:       'beatrice.howell@example.com', password_digest:, privilege_level: :default },
    { id: 86, full_name:           'Jūratė Kemmer', email:         'jurate.kemmer@example.com', password_digest:, privilege_level: :default },
    { id: 87, full_name:              'Agnė Bruen', email:            'agne.bruen@example.com', password_digest:, privilege_level: :default },
    { id: 88, full_name:       'Barbora McDermott', email:     'barbora.mcdermott@example.com', password_digest:, privilege_level: :default },
    { id: 89, full_name:          'Loreta Dickens', email:        'loreta.dickens@example.com', password_digest:, privilege_level: :default },
    { id: 90, full_name:        'Andrius Homenick', email:      'andrius.homenick@example.com', password_digest:, privilege_level: :default },
    { id: 91, full_name:         'Robertas Bednar', email:       'robertas.bednar@example.com', password_digest:, privilege_level: :default },
    { id: 92, full_name:           'Jonė Shanahan', email:         'jone.shanahan@example.com', password_digest:, privilege_level: :default },
    { id: 93, full_name:          'Benedikta Yost', email:        'benedikta.yost@example.com', password_digest:, privilege_level: :default },
    { id: 94, full_name:          'Jomantas Mertz', email:        'jomantas.mertz@example.com', password_digest:, privilege_level: :default },
    { id: 95, full_name:        'Laurynas Goyette', email:      'laurynas.goyette@example.com', password_digest:, privilege_level: :default },
    { id: 96, full_name:             'Toma Hessel', email:           'toma.hessel@example.com', password_digest:, privilege_level: :default },
    { id: 97, full_name:            'Olga Hegmann', email:          'olga.hegmann@example.com', password_digest:, privilege_level: :default }
  ]
)

# Permissions
Permission.import!(
  [
    { action: 'manage', user_id: 2, target_id: 1, target_type: 'Conference' },
    { action: 'manage', user_id: 3, target_id: 1, target_type: 'Conference' },
    { action: 'manage', user_id: 4, target_id: 1, target_type: 'Conference' },
    { action: 'manage', user_id: 5, target_id: 2, target_type: 'Conference' },
    { action: 'manage', user_id: 6, target_id: 2, target_type: 'Conference' },
    { action: 'manage', user_id: 7, target_id: 3, target_type: 'Conference' }
  ]
)

# EventReviewers
EventReviewer.import!(
  [
    { id:  1, event_id: 1, reviewer_id:  8 },
    { id:  2, event_id: 1, reviewer_id:  9 },
    { id:  3, event_id: 1, reviewer_id: 10 },
    { id:  4, event_id: 2, reviewer_id:  8 },
    { id:  5, event_id: 2, reviewer_id:  9 },
    { id:  6, event_id: 2, reviewer_id: 10 },
    { id:  7, event_id: 3, reviewer_id:  8 },
    { id:  8, event_id: 3, reviewer_id:  9 },
    { id:  9, event_id: 3, reviewer_id: 10 },

    { id: 10, event_id: 4, reviewer_id: 11 },
    { id: 11, event_id: 4, reviewer_id: 12 },
    { id: 12, event_id: 4, reviewer_id: 13 },
    { id: 13, event_id: 4, reviewer_id: 14 },
    { id: 14, event_id: 5, reviewer_id: 11 },
    { id: 15, event_id: 5, reviewer_id: 12 },
    { id: 16, event_id: 5, reviewer_id: 13 },
    { id: 17, event_id: 5, reviewer_id: 14 },

    { id: 18, event_id: 6, reviewer_id: 15 },
    { id: 19, event_id: 6, reviewer_id: 16 },

    { id: 20, event_id: 7, reviewer_id: 17 },
    { id: 21, event_id: 8, reviewer_id: 17 }
  ]
)

# Participations
Participation.import!(
  [
    { id:   1, status: :approved, user_id: 18, event_id:  6, reviewer_id:  16 },
    { id:   2, status: :approved, user_id: 19, event_id:  2, reviewer_id:   9 },
    { id:   3, status: :rejected, user_id: 19, event_id:  6, reviewer_id:  16 },
    { id:   4, status: :approved, user_id: 19, event_id:  3, reviewer_id:   8 },
    { id:   5, status: :approved, user_id: 20, event_id:  5, reviewer_id:  13 },
    { id:   6, status:  :pending, user_id: 21, event_id:  4, reviewer_id:  11 },
    { id:   7, status:  :pending, user_id: 21, event_id:  5, reviewer_id:  13 },
    { id:   8, status: :approved, user_id: 21, event_id:  3, reviewer_id: nil },
    { id:   9, status: :approved, user_id: 21, event_id:  7, reviewer_id:  17 },
    { id:  10, status: :rejected, user_id: 22, event_id:  1, reviewer_id:  10 },
    { id:  11, status: :approved, user_id: 22, event_id:  4, reviewer_id:  13 },
    { id:  12, status: :approved, user_id: 23, event_id:  2, reviewer_id:   8 },
    { id:  13, status: :approved, user_id: 23, event_id:  6, reviewer_id:  15 },
    { id:  14, status: :approved, user_id: 23, event_id:  3, reviewer_id: nil },
    { id:  15, status: :approved, user_id: 24, event_id:  1, reviewer_id: nil },
    { id:  16, status:  :pending, user_id: 24, event_id:  2, reviewer_id:   8 },
    { id:  17, status: :approved, user_id: 24, event_id:  6, reviewer_id:  15 },
    { id:  18, status: :approved, user_id: 24, event_id:  5, reviewer_id:  14 },
    { id:  19, status: :approved, user_id: 24, event_id:  3, reviewer_id:  10 },
    { id:  20, status: :rejected, user_id: 25, event_id:  3, reviewer_id:  10 },
    { id:  21, status: :approved, user_id: 25, event_id:  1, reviewer_id:   8 },
    { id:  22, status: :approved, user_id: 25, event_id:  4, reviewer_id: nil },
    { id:  23, status: :approved, user_id: 26, event_id:  6, reviewer_id:  15 },
    { id:  24, status: :approved, user_id: 26, event_id:  1, reviewer_id:   8 },
    { id:  25, status: :approved, user_id: 26, event_id:  3, reviewer_id:  10 },
    { id:  26, status: :approved, user_id: 26, event_id:  7, reviewer_id:  17 },
    { id:  27, status: :approved, user_id: 26, event_id:  5, reviewer_id: nil },
    { id:  28, status: :approved, user_id: 27, event_id:  6, reviewer_id:  16 },
    { id:  29, status: :approved, user_id: 28, event_id:  7, reviewer_id:  17 },
    { id:  30, status: :approved, user_id: 28, event_id:  2, reviewer_id:   8 },
    { id:  31, status: :approved, user_id: 29, event_id:  2, reviewer_id:   9 },
    { id:  32, status: :approved, user_id: 29, event_id:  1, reviewer_id:   9 },
    { id:  33, status: :approved, user_id: 30, event_id:  1, reviewer_id:  10 },
    { id:  34, status: :approved, user_id: 31, event_id:  1, reviewer_id:  10 },
    { id:  35, status: :approved, user_id: 31, event_id:  6, reviewer_id: nil },
    { id:  36, status:  :pending, user_id: 32, event_id:  7, reviewer_id:  17 },
    { id:  37, status: :approved, user_id: 32, event_id:  1, reviewer_id:   9 },
    { id:  38, status: :approved, user_id: 32, event_id:  2, reviewer_id:   8 },
    { id:  39, status: :approved, user_id: 32, event_id:  4, reviewer_id:  14 },
    { id:  40, status: :rejected, user_id: 33, event_id:  7, reviewer_id:  17 },
    { id:  41, status: :approved, user_id: 34, event_id:  7, reviewer_id: nil },
    { id:  42, status: :approved, user_id: 34, event_id:  4, reviewer_id:  11 },
    { id:  43, status: :approved, user_id: 34, event_id:  2, reviewer_id:   9 },
    { id:  44, status: :rejected, user_id: 34, event_id:  3, reviewer_id:  10 },
    { id:  45, status:  :pending, user_id: 34, event_id:  6, reviewer_id: nil },
    { id:  46, status: :approved, user_id: 35, event_id:  4, reviewer_id:  12 },
    { id:  47, status: :approved, user_id: 35, event_id:  3, reviewer_id:  10 },
    { id:  48, status: :approved, user_id: 35, event_id:  7, reviewer_id:  17 },
    { id:  49, status: :approved, user_id: 35, event_id:  6, reviewer_id: nil },
    { id:  50, status: :approved, user_id: 36, event_id:  1, reviewer_id:   8 },
    { id:  51, status: :approved, user_id: 36, event_id:  2, reviewer_id:   8 },
    { id:  52, status: :approved, user_id: 36, event_id:  3, reviewer_id:   9 },
    { id:  53, status: :approved, user_id: 36, event_id:  7, reviewer_id:  17 },
    { id:  54, status: :approved, user_id: 36, event_id:  4, reviewer_id:  13 },
    { id:  55, status: :approved, user_id: 37, event_id:  2, reviewer_id:   8 },
    { id:  56, status: :approved, user_id: 37, event_id:  3, reviewer_id: nil },
    { id:  57, status: :approved, user_id: 38, event_id:  1, reviewer_id:   9 },
    { id:  58, status:  :pending, user_id: 38, event_id:  7, reviewer_id: nil },
    { id:  59, status: :approved, user_id: 39, event_id:  6, reviewer_id:  16 },
    { id:  60, status: :approved, user_id: 40, event_id:  6, reviewer_id:  16 },
    { id:  61, status: :approved, user_id: 40, event_id:  7, reviewer_id:  17 },
    { id:  62, status: :approved, user_id: 40, event_id:  2, reviewer_id:   8 },
    { id:  63, status: :approved, user_id: 40, event_id:  5, reviewer_id: nil },
    { id:  64, status: :approved, user_id: 41, event_id:  6, reviewer_id:  16 },
    { id:  65, status: :approved, user_id: 41, event_id:  7, reviewer_id: nil },
    { id:  66, status: :approved, user_id: 41, event_id:  2, reviewer_id:   8 },
    { id:  67, status: :approved, user_id: 41, event_id:  1, reviewer_id:  10 },
    { id:  68, status: :approved, user_id: 41, event_id:  3, reviewer_id:   9 },
    { id:  69, status: :approved, user_id: 42, event_id:  3, reviewer_id: nil },
    { id:  70, status: :approved, user_id: 42, event_id:  2, reviewer_id:  10 },
    { id:  71, status: :approved, user_id: 42, event_id:  6, reviewer_id:  16 },
    { id:  72, status: :approved, user_id: 42, event_id:  7, reviewer_id:  17 },
    { id:  73, status: :approved, user_id: 43, event_id:  5, reviewer_id:  13 },
    { id:  74, status: :rejected, user_id: 43, event_id:  6, reviewer_id:  15 },
    { id:  75, status: :approved, user_id: 44, event_id:  5, reviewer_id:  14 },
    { id:  76, status: :approved, user_id: 44, event_id:  7, reviewer_id:  17 },
    { id:  77, status: :approved, user_id: 44, event_id:  6, reviewer_id:  15 },
    { id:  78, status: :approved, user_id: 45, event_id:  1, reviewer_id:   9 },
    { id:  79, status: :approved, user_id: 45, event_id:  5, reviewer_id:  12 },
    { id:  80, status: :rejected, user_id: 46, event_id:  7, reviewer_id:  17 },
    { id:  81, status: :approved, user_id: 46, event_id:  1, reviewer_id:   9 },
    { id:  82, status: :approved, user_id: 46, event_id:  2, reviewer_id:   8 },
    { id:  83, status: :approved, user_id: 47, event_id:  7, reviewer_id: nil },
    { id:  84, status: :approved, user_id: 47, event_id:  1, reviewer_id:  10 },
    { id:  85, status: :approved, user_id: 48, event_id:  7, reviewer_id: nil },
    { id:  86, status:  :pending, user_id: 48, event_id:  5, reviewer_id: nil },
    { id:  87, status: :approved, user_id: 49, event_id:  5, reviewer_id: nil },
    { id:  88, status: :approved, user_id: 49, event_id:  7, reviewer_id:  17 },
    { id:  89, status: :rejected, user_id: 50, event_id:  2, reviewer_id: nil },
    { id:  90, status: :approved, user_id: 50, event_id:  5, reviewer_id: nil },
    { id:  91, status: :approved, user_id: 51, event_id:  5, reviewer_id:  12 },
    { id:  92, status: :approved, user_id: 51, event_id:  1, reviewer_id: nil },
    { id:  93, status: :approved, user_id: 52, event_id:  4, reviewer_id:  14 },
    { id:  94, status: :approved, user_id: 53, event_id:  7, reviewer_id:  17 },
    { id:  95, status: :approved, user_id: 54, event_id:  3, reviewer_id:   9 },
    { id:  96, status: :approved, user_id: 54, event_id:  4, reviewer_id:  13 },
    { id:  97, status: :approved, user_id: 54, event_id:  1, reviewer_id:   8 },
    { id:  98, status:  :pending, user_id: 54, event_id:  6, reviewer_id:  16 },
    { id:  99, status:  :pending, user_id: 54, event_id:  7, reviewer_id:  17 },
    { id: 100, status:  :pending, user_id: 55, event_id:  3, reviewer_id:  10 },
    { id: 101, status: :approved, user_id: 55, event_id:  2, reviewer_id: nil },
    { id: 102, status:  :pending, user_id: 55, event_id:  5, reviewer_id:  12 },
    { id: 103, status: :approved, user_id: 55, event_id:  7, reviewer_id:  17 },
    { id: 104, status: :approved, user_id: 56, event_id:  4, reviewer_id:  12 },
    { id: 105, status: :approved, user_id: 56, event_id:  5, reviewer_id: nil },
    { id: 106, status: :approved, user_id: 57, event_id:  4, reviewer_id:  11 },
    { id: 107, status: :approved, user_id: 57, event_id:  7, reviewer_id:  17 },
    { id: 108, status: :approved, user_id: 57, event_id:  3, reviewer_id:   9 }
  ]
)

# Attach files to DocumentTemplates
# This should be last execution, as if it will seeds.rb will not cleanup attached files in case of an error in this
# script, and cause a leak. Note that `rails db:drop` will not remove local attached files. You should remove them
# manually with `rm -rf ./storage/*/`. Though left-over files in ./storage will probably not cause problems for the
# application, except for wasting disk space.
DocumentTemplate.find(1).docx.attach(io: File.open('db/seeds/Participation_Certificate_LT_1.docx'), filename: 'Participation_Certificate_LT_1.docx')
DocumentTemplate.find(3).docx.attach(io: File.open('db/seeds/Participation_Certificate_LT_1.docx'), filename: 'Participation_Certificate_LT_1.docx')
DocumentTemplate.find(5).docx.attach(io: File.open('db/seeds/Participation_Certificate_LT_1.docx'), filename: 'Participation_Certificate_LT_1.docx')
DocumentTemplate.find(7).docx.attach(io: File.open('db/seeds/Participation_Certificate_LT_1.docx'), filename: 'Participation_Certificate_LT_1.docx')

DocumentTemplate.find(2).docx.attach(io: File.open('db/seeds/Participation_Certificate_EN_1.docx'), filename: 'Participation_Certificate_EN_1.docx')
DocumentTemplate.find(4).docx.attach(io: File.open('db/seeds/Participation_Certificate_EN_1.docx'), filename: 'Participation_Certificate_EN_1.docx')
DocumentTemplate.find(6).docx.attach(io: File.open('db/seeds/Participation_Certificate_EN_1.docx'), filename: 'Participation_Certificate_EN_1.docx')
DocumentTemplate.find(8).docx.attach(io: File.open('db/seeds/Participation_Certificate_EN_1.docx'), filename: 'Participation_Certificate_EN_1.docx')

# Reset ID sequences
ActiveRecord::Base.connection.execute(
  <<-SQL.squish
    SELECT SETVAL('comments_id_seq', (SELECT MAX(id) FROM comments));
    SELECT SETVAL('conferences_id_seq', (SELECT MAX(id) FROM conferences));
    SELECT SETVAL('document_templates_id_seq', (SELECT MAX(id) FROM document_templates));
    SELECT SETVAL('event_reviewers_id_seq', (SELECT MAX(id) FROM event_reviewers));
    SELECT SETVAL('events_id_seq', (SELECT MAX(id) FROM events));
    SELECT SETVAL('mobility_string_translations_id_seq', (SELECT MAX(id) FROM mobility_string_translations));
    SELECT SETVAL('mobility_text_translations_id_seq', (SELECT MAX(id) FROM mobility_text_translations));
    SELECT SETVAL('participations_id_seq', (SELECT MAX(id) FROM participations));
    SELECT SETVAL('permissions_id_seq', (SELECT MAX(id) FROM permissions));
    SELECT SETVAL('users_id_seq', (SELECT MAX(id) FROM users));
  SQL
)

# rubocop:enable Lint/RedundantCopDisableDirective, Layout/HashAlignment, Layout/ExtraSpacing, Layout/LineLength
