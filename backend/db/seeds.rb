# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# rubocop:disable Layout/HashAlignment, Layout/ExtraSpacing, Layout/LineLength

# Fix random generator
Faker::Config.random = Random.new(2023)

# Enable queries logging to console
ActiveRecord::Base.logger = Logger.new($stdout)

# ApplicationRecord.import! validates all records but inserts all rows in a single query

# Utilities
lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est soluta quod temporibus nisi ab recusandae ex dolores tenetur nemo, impedit hic, animi provident iure. Architecto, adipisci nisi? Vitae ex quas ea at nulla eos alias? Blanditiis nesciunt mollitia et quae vitae saepe dolorem totam enim dicta, eius natus a dolore libero unde officia, ducimus magni amet. Vitae aut minima tenetur maiores dolore similique odio dicta dolorum, assumenda, debitis, pariatur quidem earum architecto omnis provident ratione eveniet sit. Impedit, explicabo ut. Perspiciatis, sequi! Delectus, earum vero inventore expedita repellendus natus ipsam facilis ab, laborum tempore qui magni quis, error deserunt magnam ipsum in unde? Labore iusto, corrupti quaerat iure, asperiores ad laborum in eos pariatur deleniti nam. Quidem aliquid consequatur aperiam esse alias, nihil enim quas id quae iure. Sapiente rem ducimus officia maiores quam dicta corporis ipsum perspiciatis! Deserunt obcaecati ullam quia architecto illum, dolores unde, dignissimos magnam reprehenderit debitis hic eaque minus fugiat molestiae! Quidem, aliquam. Enim perferendis molestiae nesciunt et dolor similique corrupti alias voluptas culpa. Neque accusamus dolorum quasi repellat. Adipisci, repellendus cupiditate ipsum iste distinctio officiis. Facilis doloremque laborum ipsam perferendis iure deleniti mollitia rerum quisquam ea cum sequi dolorum magni qui necessitatibus quis enim saepe, nesciunt iusto libero ab ipsum alias maxime quos? Possimus praesentium ea a aperiam placeat at velit corporis dolore magnam ipsam rerum repudiandae, dicta quae eum nesciunt ullam? Maxime ipsum labore nostrum aperiam amet quisquam velit distinctio suscipit, harum officia accusamus? Voluptatum quo nulla asperiores doloribus reprehenderit aliquam ipsam, esse inventore facilis ipsa commodi autem optio est ducimus officia vero, molestias delectus? Ipsum aperiam aspernatur consequuntur itaque nihil in minima numquam placeat consequatur delectus, suscipit, reiciendis corrupti veniam provident? Laudantium, voluptatem debitis cumque possimus laborum consequatur pariatur sit vel quos nulla tempore inventore exercitationem explicabo repellendus corrupti eveniet reiciendis eum omnis sequi placeat amet? Esse ipsum rem ipsa officia unde voluptatem quia fugiat laudantium laboriosam illum quam possimus nemo eaque facere itaque sequi provident, enim beatae deleniti laborum perferendis dicta tempora adipisci. Non dignissimos placeat neque architecto in doloremque necessitatibus, hic nobis exercitationem facere, autem tenetur sit delectus quasi nulla reprehenderit temporibus. Excepturi dolore aspernatur aperiam est tempora similique asperiores cum quam illum facere cumque temporibus ipsam esse perferendis recusandae illo, amet incidunt dignissimos dolorem fuga, veritatis veniam deleniti. Ducimus atque corrupti aliquid nemo at voluptates necessitatibus amet esse, modi id perferendis excepturi dolorem vel? Dignissimos totam repellat cumque, obcaecati doloremque quaerat dolorum quis saepe ratione vitae accusantium eaque blanditiis esse magnam optio sunt omnis iure officia maiores cupiditate amet officiis sapiente hic. Impedit facilis in, aut cum fugiat libero ea est nihil ducimus blanditiis animi suscipit odio adipisci nisi magnam quos saepe nemo ex! Vero autem veniam saepe deleniti est esse obcaecati quam culpa. Ipsum iusto dolores perferendis animi tempore quis. Cupiditate necessitatibus fugiat possimus impedit blanditiis earum. Sed voluptates a officiis impedit quas, ipsa corporis nulla minima hic, ab perferendis iusto perspiciatis tenetur fugit vel quos ea ex sapiente. Ratione assumenda iste quod amet ex commodi dolorum vero. Mollitia beatae delectus nulla excepturi corrupti, explicabo hic optio illum architecto ad, laboriosam repellat. Hic deserunt, excepturi est adipisci fuga ullam? Enim, obcaecati consequuntur aliquid itaque quibusdam et quae, atque aut doloribus mollitia soluta architecto iste vel, eveniet accusamus! Quas non reiciendis porro corporis, nesciunt ex assumenda placeat odio dolore ad sed itaque architecto doloremque temporibus commodi qui incidunt suscipit mollitia sapiente, fugiat, perspiciatis magni recusandae. Rerum, necessitatibus numquam? Ducimus assumenda cupiditate eveniet, voluptas reiciendis minus. Neque earum velit id dolorum, tenetur modi voluptatum saepe veniam non suscipit consequatur adipisci optio perferendis vel, animi possimus! Quidem repellat, ipsam deserunt necessitatibus voluptas facilis eligendi laudantium magnam, a expedita consequuntur itaque iste vel aut doloribus earum? Fugiat atque temporibus alias, delectus quo culpa quasi laboriosam animi, quam est eaque? Excepturi ab provident natus ullam rerum, repudiandae maxime et ex eveniet corporis veritatis laudantium beatae, expedita est illum aliquam eum enim fugiat inventore earum nihil dolore. Quas, enim eum ducimus distinctio vero quibusdam temporibus atque delectus tenetur, perspiciatis amet, praesentium voluptas. Obcaecati exercitationem iste amet ea saepe, tenetur repudiandae sint quos unde natus perspiciatis odit aliquid magnam numquam quasi reiciendis voluptatibus! Eaque veritatis veniam odio ipsum, magnam labore natus itaque in enim repudiandae assumenda et nostrum ipsa iusto sequi quos eligendi libero placeat non minima doloremque numquam, ducimus corrupti quidem! Impedit maxime rerum ipsum enim consectetur voluptatibus, exercitationem nostrum voluptates deserunt vero alias soluta animi vitae sapiente earum qui debitis aspernatur tenetur pariatur magni! Adipisci consectetur doloribus sunt, asperiores iste ex natus, ducimus libero necessitatibus mollitia porro quo illum iusto beatae accusamus amet rerum minima alias non nihil animi! Deleniti, alias? Facere reiciendis, rerum, doloremque deleniti enim ipsa beatae earum reprehenderit placeat nobis voluptas doloribus praesentium architecto vero autem excepturi eos nulla consectetur necessitatibus. Itaque possimus necessitatibus cum optio temporibus maiores tenetur neque, sequi quaerat sint aspernatur quod nisi error architecto fuga suscipit reprehenderit voluptas maxime autem corrupti, dolorem mollitia. Repudiandae in suscipit enim ipsum ea error eos eligendi soluta ex possimus veritatis beatae doloribus deserunt reiciendis doloremque, qui nostrum! Accusamus aspernatur voluptas officiis iusto, sed libero facere ut tempora, sint quidem animi consequuntur explicabo ab incidunt nesciunt, sequi architecto! Libero, neque! Ullam magnam cumque, natus aliquid distinctio rem quae doloribus et maxime reprehenderit recusandae accusamus vitae ea deleniti voluptate itaque ratione explicabo reiciendis eos similique beatae dolorum saepe molestias. Vitae ipsam voluptatibus odit inventore atque non totam, quas fugiat doloremque eligendi, corporis, dicta nam. Ducimus, ratione quisquam. Quidem nihil repellat facilis unde tenetur? Eum asperiores pariatur voluptatum aut delectus autem amet est totam corporis, corrupti saepe impedit eveniet vel iure neque, illum odio. Quia quibusdam dolor porro repellendus est! Esse quos molestiae voluptate totam quam, deleniti, repudiandae eum consequatur voluptatem perspiciatis cum vitae similique distinctio temporibus nemo? Accusantium et distinctio facilis veritatis nisi ea quam ab commodi facere, quibusdam at illo quo dolores voluptate hic voluptatibus. Voluptas qui, magnam ipsum suscipit soluta eaque, non aliquid impedit rerum pariatur minima eum veritatis, voluptatibus perspiciatis aperiam dolores? Dolorem numquam fugit, inventore nemo deserunt aperiam a.'

description = <<~MD
  # About

  #{lorem.first(100)}

  # Further Reading

  #{lorem.first(100)}

  # Contact

  [link](https://example.com)
MD

# Conferences
Conference.import!(
  [
    { id: 1, title: 'Informatics', description: },
    { id: 2, title: 'Electronics', description: },
    { id: 3, title: 'Design',      description: },
    { id: 4, title: 'Mechanics',   description: }
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

# Attach files to DocumentTemplates
DocumentTemplate.find(1).docx.attach(io: File.open('db/seeds/Participation_Certificate_LT_1.docx'), filename: 'Participation_Certificate_LT_1.docx')
DocumentTemplate.find(3).docx.attach(io: File.open('db/seeds/Participation_Certificate_LT_1.docx'), filename: 'Participation_Certificate_LT_1.docx')
DocumentTemplate.find(5).docx.attach(io: File.open('db/seeds/Participation_Certificate_LT_1.docx'), filename: 'Participation_Certificate_LT_1.docx')
DocumentTemplate.find(7).docx.attach(io: File.open('db/seeds/Participation_Certificate_LT_1.docx'), filename: 'Participation_Certificate_LT_1.docx')

DocumentTemplate.find(2).docx.attach(io: File.open('db/seeds/Participation_Certificate_EN_1.docx'), filename: 'Participation_Certificate_EN_1.docx')
DocumentTemplate.find(4).docx.attach(io: File.open('db/seeds/Participation_Certificate_EN_1.docx'), filename: 'Participation_Certificate_EN_1.docx')
DocumentTemplate.find(6).docx.attach(io: File.open('db/seeds/Participation_Certificate_EN_1.docx'), filename: 'Participation_Certificate_EN_1.docx')
DocumentTemplate.find(8).docx.attach(io: File.open('db/seeds/Participation_Certificate_EN_1.docx'), filename: 'Participation_Certificate_EN_1.docx')

# Events
Event.import!(
  [
    {
      id:                1,
      conference_id:     1,
      title:             'Informatics Conference 2022',
      description:,
      date:              Date.new(2022, 2, 5),
      registration_from: Date.new(2022, 1, 1),
      registration_to:   Date.new(2022, 1, 31),
      status: 'open'
    },
    {
      id:                2,
      conference_id:     1,
      title:             'Informatics Conference 2023',
      description:,
      date:              Date.new(2023, 5, 5),
      registration_from: Date.new(2023, 2, 1),
      registration_to:   Date.new(2023, 4, 30),
      status: 'open'
    },
    {
      id:                3,
      conference_id:     1,
      title:             'Informatics Conference 2024',
      description:,
      date:              Date.new(2024, 2, 1),
      registration_from: Date.new(2024, 1, 1),
      registration_to:   Date.new(2024, 1, 20),
      status: 'open'
    },
    {
      id:                4,
      conference_id:     2,
      title:             'Electronics & Stuff',
      description:,
      date:              Date.new(2022, 10, 1),
      registration_from: Date.new(2022, 9, 1),
      registration_to:   Date.new(2022, 9, 30),
      status: 'open'
    },
    {
      id:                5,
      conference_id:     2,
      title:             'Electronics & Stuff',
      description:,
      date:              Date.new(2023, 10, 1),
      registration_from: Date.new(2023, 9, 1),
      registration_to:   Date.new(2023, 9, 30),
      status: 'open'
    },
    {
      id:                6,
      conference_id:     3,
      title:             'Awesome Design Conf',
      description:,
      date:              Date.new(2024, 2, 1),
      registration_from: Date.new(2024, 1, 1),
      registration_to:   Date.new(2024, 1, 31),
      status: 'open'
    },
    {
      id:                7,
      conference_id:     4,
      title:             'Mechanics & Stuff 2023',
      description:,
      date:              Date.new(2023, 5, 1),
      registration_from: Date.new(2022, 4, 1),
      registration_to:   Date.new(2022, 4, 20),
      status: 'open'
    },
    {
      id:                8,
      conference_id:     4,
      title:             'Mechanics & Stuff 2024',
      description:,
      date:              Date.new(2024, 5, 1),
      registration_from: Date.new(2022, 4, 1),
      registration_to:   Date.new(2022, 4, 20),
      status: 'hidden'
    }
  ]
)

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
    { full_name:                'John Doe', email:                 'admin@example.com', password_digest:, privilege_level:   :admin },
    { full_name:         'Eugenija Pouros', email:       'eugenija.pouros@example.com', password_digest:, privilege_level: :default },
    { full_name:            'Alius Spinka', email:          'alius.spinka@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Agnė Reynolds', email:         'agne.reynolds@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Simonas Dibbert', email:       'simonas.dibbert@example.com', password_digest:, privilege_level: :default },
    { full_name:             'Vida Heaney', email:           'vida.heaney@example.com', password_digest:, privilege_level: :default },
    { full_name:            'Juozas Adams', email:          'juozas.adams@example.com', password_digest:, privilege_level: :default },
    { full_name:             'Valys Wolff', email:           'valys.wolff@example.com', password_digest:, privilege_level: :default },
    { full_name:              'Vida Kunde', email:            'vida.kunde@example.com', password_digest:, privilege_level: :default },
    { full_name:       'Kristina McKenzie', email:     'kristina.mckenzie@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Roberta Johnston', email:      'roberta.johnston@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Karolis Corkery', email:       'karolis.corkery@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Enrika Mueller', email:        'enrika.mueller@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Renata McClure', email:        'renata.mcclure@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Arnas Considine', email:       'arnas.considine@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Jomantė Jacobson', email:      'jomante.jacobson@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Vitalija Wolff', email:        'vitalija.wolff@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Silvija Keeling', email:       'silvija.keeling@example.com', password_digest:, privilege_level: :default },
    { full_name:     'Modesta Oberbrunner', email:   'modesta.oberbrunner@example.com', password_digest:, privilege_level: :default },
    { full_name:       'Elžbieta Reichert', email:     'elzbieta.reichert@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Prančiškus Wiegand', email:    'pranciskus.wiegand@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Beatričė Roberts', email:      'beatrice.roberts@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Vidas Gutkowski', email:       'vidas.gutkowski@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Benediktas Rice', email:       'benediktas.rice@example.com', password_digest:, privilege_level: :default },
    { full_name:              'Arnas Hane', email:            'arnas.hane@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Enrika Breitenberg', email:    'enrika.breitenberg@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Milda Wuckert', email:         'milda.wuckert@example.com', password_digest:, privilege_level: :default },
    { full_name:            'Vida Waelchi', email:          'vida.waelchi@example.com', password_digest:, privilege_level: :default },
    { full_name:            'Algis Walker', email:          'algis.walker@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Cecilija Aufderhar', email:    'cecilija.aufderhar@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Jūratė Mitchell', email:       'jurate.mitchell@example.com', password_digest:, privilege_level: :default },
    { full_name:             'Stasė Yundt', email:           'stase.yundt@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Brigita Skiles', email:        'brigita.skiles@example.com', password_digest:, privilege_level: :default },
    { full_name:    'Stefanija Macejkovic', email:  'stefanija.macejkovic@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Danielius Price', email:       'danielius.price@example.com', password_digest:, privilege_level: :default },
    { full_name:            'Agnė Ullrich', email:          'agne.ullrich@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Loreta Brekke', email:         'loreta.brekke@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Karolina Windler', email:      'karolina.windler@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Benediktas Trantow', email:    'benediktas.trantow@example.com', password_digest:, privilege_level: :default },
    { full_name:            'Saulė Legros', email:          'saule.legros@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Ernestas Romaguera', email:    'ernestas.romaguera@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Danielius Welch', email:       'danielius.welch@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Prančiškus Goyette', email:    'pranciskus.goyette@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Henrikas Sauer', email:        'henrikas.sauer@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Brigita Marks', email:         'brigita.marks@example.com', password_digest:, privilege_level: :default },
    { full_name:             'Gintė Crist', email:           'ginte.crist@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Juozapas Hahn', email:         'juozapas.hahn@example.com', password_digest:, privilege_level: :default },
    { full_name:       'Benedikta Steuber', email:     'benedikta.steuber@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Audrius Harris', email:        'audrius.harris@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Ernestas Brakus', email:       'ernestas.brakus@example.com', password_digest:, privilege_level: :default },
    { full_name:             'Kazys Boehm', email:           'kazys.boehm@example.com', password_digest:, privilege_level: :default },
    { full_name:            'Stasė Heaney', email:          'stase.heaney@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Enrikas Brekke', email:        'enrikas.brekke@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Simona Miller', email:         'simona.miller@example.com', password_digest:, privilege_level: :default },
    { full_name:       'Benedikta Watsica', email:     'benedikta.watsica@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Renatas Streich', email:       'renatas.streich@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Mečislovas Veum', email:       'mecislovas.veum@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Justas Dickinson', email:      'justas.dickinson@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Karolina Ziemann', email:      'karolina.ziemann@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Mykolas Hilpert', email:       'mykolas.hilpert@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Silvija Fisher', email:        'silvija.fisher@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Barbora Mayer', email:         'barbora.mayer@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Eugenija Padberg', email:      'eugenija.padberg@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Arminas Roberts', email:       'arminas.roberts@example.com', password_digest:, privilege_level: :default },
    { full_name:       'Florijonas Waters', email:     'florijonas.waters@example.com', password_digest:, privilege_level: :default },
    { full_name:              'Romas Howe', email:            'romas.howe@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Adolfas Koelpin', email:       'adolfas.koelpin@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Aleksandras Rippin', email:    'aleksandras.rippin@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Jomantas Armstrong', email:    'jomantas.armstrong@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Arnas Friesen', email:         'arnas.friesen@example.com', password_digest:, privilege_level: :default },
    { full_name:            'Jomantė Rath', email:          'jomante.rath@example.com', password_digest:, privilege_level: :default },
    { full_name:       'Valdemaras Glover', email:     'valdemaras.glover@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Prančiškus Bauch', email:      'pranciskus.bauch@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Genovaitė Lindgren', email:    'genovaite.lindgren@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Gintarė Bartell', email:       'gintare.bartell@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Vaidas McClure', email:        'vaidas.mcclure@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Dalia Treutel', email:         'dalia.treutel@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Danielius Luettgen', email:    'danielius.luettgen@example.com', password_digest:, privilege_level: :default },
    { full_name:       'Genovaitė Trantow', email:     'genovaite.trantow@example.com', password_digest:, privilege_level: :default },
    { full_name:      'Austėja Swaniawski', email:    'austeja.swaniawski@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Zenonas Weissnat', email:      'zenonas.weissnat@example.com', password_digest:, privilege_level: :default },
    { full_name:              'Rožė Kunze', email:            'roze.kunze@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Jogaila Smitham', email:       'jogaila.smitham@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Toma VonRueden', email:        'toma.vonrueden@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Beatričė Howell', email:       'beatrice.howell@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Jūratė Kemmer', email:         'jurate.kemmer@example.com', password_digest:, privilege_level: :default },
    { full_name:              'Agnė Bruen', email:            'agne.bruen@example.com', password_digest:, privilege_level: :default },
    { full_name:       'Barbora McDermott', email:     'barbora.mcdermott@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Loreta Dickens', email:        'loreta.dickens@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Andrius Homenick', email:      'andrius.homenick@example.com', password_digest:, privilege_level: :default },
    { full_name:         'Robertas Bednar', email:       'robertas.bednar@example.com', password_digest:, privilege_level: :default },
    { full_name:           'Jonė Shanahan', email:         'jone.shanahan@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Benedikta Yost', email:        'benedikta.yost@example.com', password_digest:, privilege_level: :default },
    { full_name:          'Jomantas Mertz', email:        'jomantas.mertz@example.com', password_digest:, privilege_level: :default },
    { full_name:        'Laurynas Goyette', email:      'laurynas.goyette@example.com', password_digest:, privilege_level: :default },
    { full_name:             'Toma Hessel', email:           'toma.hessel@example.com', password_digest:, privilege_level: :default },
    { full_name:            'Olga Hegmann', email:          'olga.hegmann@example.com', password_digest:, privilege_level: :default }
  ]
)

# Permissions
Permission.import!(
  [
    { action: 'manage', user_id: 2, target_id: 1, target_type: 'Conference' },
    { action: 'manage', user_id: 3, target_id: 1, target_type: 'Conference' },
    { action: 'read',   user_id: 4, target_id: 1, target_type: 'Conference' },
    { action: 'manage', user_id: 5, target_id: 2, target_type: 'Conference' },
    { action: 'read',   user_id: 6, target_id: 2, target_type: 'Conference' },
    { action: 'manage', user_id: 7, target_id: 3, target_type: 'Conference' }
  ]
)

# Participations
Participation.import!(
  [
    { status: :pending,  user_id: 8,  event_id: 7 },
    { status: :approved, user_id: 8,  event_id: 2 },
    { status: :approved, user_id: 9,  event_id: 3 },
    { status: :pending,  user_id: 10, event_id: 1 },
    { status: :pending,  user_id: 10, event_id: 4 },
    { status: :approved, user_id: 11, event_id: 7 },
    { status: :approved, user_id: 11, event_id: 1 },
    { status: :pending,  user_id: 11, event_id: 2 },
    { status: :approved, user_id: 11, event_id: 6 },
    { status: :approved, user_id: 11, event_id: 3 },
    { status: :approved, user_id: 12, event_id: 4 },
    { status: :approved, user_id: 12, event_id: 5 },
    { status: :approved, user_id: 12, event_id: 1 },
    { status: :approved, user_id: 12, event_id: 3 },
    { status: :approved, user_id: 12, event_id: 6 },
    { status: :approved, user_id: 13, event_id: 1 },
    { status: :approved, user_id: 13, event_id: 6 },
    { status: :approved, user_id: 13, event_id: 7 },
    { status: :pending,  user_id: 14, event_id: 1 },
    { status: :pending,  user_id: 14, event_id: 7 },
    { status: :pending,  user_id: 14, event_id: 2 },
    { status: :approved, user_id: 14, event_id: 5 },
    { status: :approved, user_id: 14, event_id: 3 },
    { status: :rejected, user_id: 15, event_id: 4 },
    { status: :approved, user_id: 15, event_id: 2 },
    { status: :approved, user_id: 15, event_id: 5 },
    { status: :approved, user_id: 15, event_id: 7 },
    { status: :approved, user_id: 15, event_id: 3 },
    { status: :pending,  user_id: 16, event_id: 4 },
    { status: :approved, user_id: 16, event_id: 5 },
    { status: :approved, user_id: 16, event_id: 7 },
    { status: :pending,  user_id: 16, event_id: 1 },
    { status: :approved, user_id: 17, event_id: 5 },
    { status: :pending,  user_id: 17, event_id: 1 },
    { status: :approved, user_id: 18, event_id: 2 },
    { status: :pending,  user_id: 18, event_id: 4 },
    { status: :approved, user_id: 18, event_id: 5 },
    { status: :approved, user_id: 19, event_id: 3 },
    { status: :approved, user_id: 20, event_id: 1 },
    { status: :approved, user_id: 20, event_id: 7 },
    { status: :pending,  user_id: 20, event_id: 3 },
    { status: :approved, user_id: 20, event_id: 2 },
    { status: :approved, user_id: 20, event_id: 5 },
    { status: :rejected, user_id: 21, event_id: 1 },
    { status: :approved, user_id: 22, event_id: 2 },
    { status: :approved, user_id: 22, event_id: 3 },
    { status: :approved, user_id: 22, event_id: 1 },
    { status: :approved, user_id: 22, event_id: 7 },
    { status: :approved, user_id: 23, event_id: 1 },
    { status: :pending,  user_id: 23, event_id: 6 },
    { status: :approved, user_id: 23, event_id: 4 },
    { status: :approved, user_id: 24, event_id: 6 },
    { status: :approved, user_id: 24, event_id: 7 },
    { status: :pending,  user_id: 25, event_id: 4 },
    { status: :approved, user_id: 26, event_id: 1 },
    { status: :pending,  user_id: 26, event_id: 5 },
    { status: :approved, user_id: 26, event_id: 7 },
    { status: :approved, user_id: 27, event_id: 3 },
    { status: :approved, user_id: 27, event_id: 2 },
    { status: :pending,  user_id: 27, event_id: 5 },
    { status: :approved, user_id: 27, event_id: 6 },
    { status: :approved, user_id: 27, event_id: 1 },
    { status: :approved, user_id: 28, event_id: 6 },
    { status: :pending,  user_id: 28, event_id: 7 },
    { status: :approved, user_id: 28, event_id: 5 },
    { status: :approved, user_id: 28, event_id: 4 },
    { status: :pending,  user_id: 29, event_id: 5 },
    { status: :approved, user_id: 29, event_id: 4 },
    { status: :pending,  user_id: 29, event_id: 3 },
    { status: :approved, user_id: 30, event_id: 7 },
    { status: :approved, user_id: 30, event_id: 5 },
    { status: :approved, user_id: 30, event_id: 6 },
    { status: :approved, user_id: 31, event_id: 7 },
    { status: :approved, user_id: 31, event_id: 4 },
    { status: :approved, user_id: 31, event_id: 5 },
    { status: :rejected, user_id: 31, event_id: 3 },
    { status: :rejected, user_id: 31, event_id: 1 },
    { status: :approved, user_id: 32, event_id: 2 },
    { status: :approved, user_id: 32, event_id: 3 },
    { status: :approved, user_id: 33, event_id: 6 },
    { status: :approved, user_id: 33, event_id: 3 },
    { status: :approved, user_id: 34, event_id: 4 },
    { status: :approved, user_id: 34, event_id: 7 },
    { status: :approved, user_id: 35, event_id: 1 },
    { status: :approved, user_id: 35, event_id: 5 },
    { status: :approved, user_id: 35, event_id: 3 },
    { status: :approved, user_id: 36, event_id: 3 },
    { status: :approved, user_id: 36, event_id: 6 },
    { status: :approved, user_id: 36, event_id: 2 },
    { status: :approved, user_id: 36, event_id: 4 },
    { status: :approved, user_id: 36, event_id: 5 },
    { status: :approved, user_id: 37, event_id: 2 },
    { status: :approved, user_id: 38, event_id: 3 },
    { status: :approved, user_id: 38, event_id: 6 },
    { status: :approved, user_id: 38, event_id: 7 },
    { status: :approved, user_id: 39, event_id: 2 },
    { status: :approved, user_id: 39, event_id: 4 },
    { status: :approved, user_id: 40, event_id: 6 },
    { status: :approved, user_id: 41, event_id: 1 },
    { status: :approved, user_id: 42, event_id: 4 },
    { status: :approved, user_id: 42, event_id: 5 },
    { status: :approved, user_id: 43, event_id: 5 },
    { status: :pending,  user_id: 43, event_id: 7 },
    { status: :approved, user_id: 44, event_id: 4 },
    { status: :approved, user_id: 44, event_id: 2 },
    { status: :approved, user_id: 44, event_id: 7 },
    { status: :approved, user_id: 45, event_id: 6 },
    { status: :approved, user_id: 45, event_id: 2 },
    { status: :approved, user_id: 45, event_id: 3 },
    { status: :approved, user_id: 45, event_id: 1 },
    { status: :approved, user_id: 45, event_id: 5 },
    { status: :approved, user_id: 46, event_id: 6 },
    { status: :approved, user_id: 46, event_id: 3 },
    { status: :approved, user_id: 46, event_id: 2 },
    { status: :rejected, user_id: 46, event_id: 4 },
    { status: :approved, user_id: 47, event_id: 5 },
    { status: :approved, user_id: 47, event_id: 3 },
    { status: :approved, user_id: 47, event_id: 7 },
    { status: :approved, user_id: 47, event_id: 2 },
    { status: :approved, user_id: 48, event_id: 4 },
    { status: :approved, user_id: 49, event_id: 2 },
    { status: :approved, user_id: 49, event_id: 4 },
    { status: :approved, user_id: 49, event_id: 7 },
    { status: :approved, user_id: 49, event_id: 6 },
    { status: :approved, user_id: 50, event_id: 2 },
    { status: :approved, user_id: 50, event_id: 1 },
    { status: :approved, user_id: 51, event_id: 6 },
    { status: :approved, user_id: 51, event_id: 3 },
    { status: :approved, user_id: 51, event_id: 4 },
    { status: :approved, user_id: 51, event_id: 5 },
    { status: :approved, user_id: 51, event_id: 1 },
    { status: :approved, user_id: 52, event_id: 6 },
    { status: :approved, user_id: 52, event_id: 4 },
    { status: :approved, user_id: 52, event_id: 2 },
    { status: :rejected, user_id: 52, event_id: 7 },
    { status: :approved, user_id: 52, event_id: 5 },
    { status: :approved, user_id: 53, event_id: 2 },
    { status: :approved, user_id: 54, event_id: 2 },
    { status: :approved, user_id: 54, event_id: 7 },
    { status: :approved, user_id: 54, event_id: 5 },
    { status: :approved, user_id: 54, event_id: 6 },
    { status: :approved, user_id: 54, event_id: 3 },
    { status: :approved, user_id: 55, event_id: 5 },
    { status: :rejected, user_id: 55, event_id: 1 },
    { status: :approved, user_id: 55, event_id: 3 },
    { status: :approved, user_id: 55, event_id: 4 },
    { status: :pending,  user_id: 56, event_id: 1 },
    { status: :approved, user_id: 57, event_id: 7 },
    { status: :approved, user_id: 76, event_id: 2 },
    { status: :approved, user_id: 76, event_id: 7 },
    { status: :pending,  user_id: 76, event_id: 5 }
  ]
)

# rubocop:enable Layout/HashAlignment, Layout/ExtraSpacing, Layout/LineLength
