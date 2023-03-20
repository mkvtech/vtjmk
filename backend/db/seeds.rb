# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# rubocop:disable Layout/HashAlignment

# Fix random generator
Faker::Config.random = Random.new(2023)

# Enable queries logging to console
ActiveRecord::Base.logger = Logger.new($stdout)

# ApplicationRecord.import! validates all records but inserts all rows in a single query

# Utilities
lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est soluta quod temporibus nisi ab recusandae ex dolores tenetur nemo, impedit hic, animi provident iure. Architecto, adipisci nisi? Vitae ex quas ea at nulla eos alias? Blanditiis nesciunt mollitia et quae vitae saepe dolorem totam enim dicta, eius natus a dolore libero unde officia, ducimus magni amet. Vitae aut minima tenetur maiores dolore similique odio dicta dolorum, assumenda, debitis, pariatur quidem earum architecto omnis provident ratione eveniet sit. Impedit, explicabo ut. Perspiciatis, sequi! Delectus, earum vero inventore expedita repellendus natus ipsam facilis ab, laborum tempore qui magni quis, error deserunt magnam ipsum in unde? Labore iusto, corrupti quaerat iure, asperiores ad laborum in eos pariatur deleniti nam. Quidem aliquid consequatur aperiam esse alias, nihil enim quas id quae iure. Sapiente rem ducimus officia maiores quam dicta corporis ipsum perspiciatis! Deserunt obcaecati ullam quia architecto illum, dolores unde, dignissimos magnam reprehenderit debitis hic eaque minus fugiat molestiae! Quidem, aliquam. Enim perferendis molestiae nesciunt et dolor similique corrupti alias voluptas culpa. Neque accusamus dolorum quasi repellat. Adipisci, repellendus cupiditate ipsum iste distinctio officiis. Facilis doloremque laborum ipsam perferendis iure deleniti mollitia rerum quisquam ea cum sequi dolorum magni qui necessitatibus quis enim saepe, nesciunt iusto libero ab ipsum alias maxime quos? Possimus praesentium ea a aperiam placeat at velit corporis dolore magnam ipsam rerum repudiandae, dicta quae eum nesciunt ullam? Maxime ipsum labore nostrum aperiam amet quisquam velit distinctio suscipit, harum officia accusamus? Voluptatum quo nulla asperiores doloribus reprehenderit aliquam ipsam, esse inventore facilis ipsa commodi autem optio est ducimus officia vero, molestias delectus? Ipsum aperiam aspernatur consequuntur itaque nihil in minima numquam placeat consequatur delectus, suscipit, reiciendis corrupti veniam provident? Laudantium, voluptatem debitis cumque possimus laborum consequatur pariatur sit vel quos nulla tempore inventore exercitationem explicabo repellendus corrupti eveniet reiciendis eum omnis sequi placeat amet? Esse ipsum rem ipsa officia unde voluptatem quia fugiat laudantium laboriosam illum quam possimus nemo eaque facere itaque sequi provident, enim beatae deleniti laborum perferendis dicta tempora adipisci. Non dignissimos placeat neque architecto in doloremque necessitatibus, hic nobis exercitationem facere, autem tenetur sit delectus quasi nulla reprehenderit temporibus. Excepturi dolore aspernatur aperiam est tempora similique asperiores cum quam illum facere cumque temporibus ipsam esse perferendis recusandae illo, amet incidunt dignissimos dolorem fuga, veritatis veniam deleniti. Ducimus atque corrupti aliquid nemo at voluptates necessitatibus amet esse, modi id perferendis excepturi dolorem vel? Dignissimos totam repellat cumque, obcaecati doloremque quaerat dolorum quis saepe ratione vitae accusantium eaque blanditiis esse magnam optio sunt omnis iure officia maiores cupiditate amet officiis sapiente hic. Impedit facilis in, aut cum fugiat libero ea est nihil ducimus blanditiis animi suscipit odio adipisci nisi magnam quos saepe nemo ex! Vero autem veniam saepe deleniti est esse obcaecati quam culpa. Ipsum iusto dolores perferendis animi tempore quis. Cupiditate necessitatibus fugiat possimus impedit blanditiis earum. Sed voluptates a officiis impedit quas, ipsa corporis nulla minima hic, ab perferendis iusto perspiciatis tenetur fugit vel quos ea ex sapiente. Ratione assumenda iste quod amet ex commodi dolorum vero. Mollitia beatae delectus nulla excepturi corrupti, explicabo hic optio illum architecto ad, laboriosam repellat. Hic deserunt, excepturi est adipisci fuga ullam? Enim, obcaecati consequuntur aliquid itaque quibusdam et quae, atque aut doloribus mollitia soluta architecto iste vel, eveniet accusamus! Quas non reiciendis porro corporis, nesciunt ex assumenda placeat odio dolore ad sed itaque architecto doloremque temporibus commodi qui incidunt suscipit mollitia sapiente, fugiat, perspiciatis magni recusandae. Rerum, necessitatibus numquam? Ducimus assumenda cupiditate eveniet, voluptas reiciendis minus. Neque earum velit id dolorum, tenetur modi voluptatum saepe veniam non suscipit consequatur adipisci optio perferendis vel, animi possimus! Quidem repellat, ipsam deserunt necessitatibus voluptas facilis eligendi laudantium magnam, a expedita consequuntur itaque iste vel aut doloribus earum? Fugiat atque temporibus alias, delectus quo culpa quasi laboriosam animi, quam est eaque? Excepturi ab provident natus ullam rerum, repudiandae maxime et ex eveniet corporis veritatis laudantium beatae, expedita est illum aliquam eum enim fugiat inventore earum nihil dolore. Quas, enim eum ducimus distinctio vero quibusdam temporibus atque delectus tenetur, perspiciatis amet, praesentium voluptas. Obcaecati exercitationem iste amet ea saepe, tenetur repudiandae sint quos unde natus perspiciatis odit aliquid magnam numquam quasi reiciendis voluptatibus! Eaque veritatis veniam odio ipsum, magnam labore natus itaque in enim repudiandae assumenda et nostrum ipsa iusto sequi quos eligendi libero placeat non minima doloremque numquam, ducimus corrupti quidem! Impedit maxime rerum ipsum enim consectetur voluptatibus, exercitationem nostrum voluptates deserunt vero alias soluta animi vitae sapiente earum qui debitis aspernatur tenetur pariatur magni! Adipisci consectetur doloribus sunt, asperiores iste ex natus, ducimus libero necessitatibus mollitia porro quo illum iusto beatae accusamus amet rerum minima alias non nihil animi! Deleniti, alias? Facere reiciendis, rerum, doloremque deleniti enim ipsa beatae earum reprehenderit placeat nobis voluptas doloribus praesentium architecto vero autem excepturi eos nulla consectetur necessitatibus. Itaque possimus necessitatibus cum optio temporibus maiores tenetur neque, sequi quaerat sint aspernatur quod nisi error architecto fuga suscipit reprehenderit voluptas maxime autem corrupti, dolorem mollitia. Repudiandae in suscipit enim ipsum ea error eos eligendi soluta ex possimus veritatis beatae doloribus deserunt reiciendis doloremque, qui nostrum! Accusamus aspernatur voluptas officiis iusto, sed libero facere ut tempora, sint quidem animi consequuntur explicabo ab incidunt nesciunt, sequi architecto! Libero, neque! Ullam magnam cumque, natus aliquid distinctio rem quae doloribus et maxime reprehenderit recusandae accusamus vitae ea deleniti voluptate itaque ratione explicabo reiciendis eos similique beatae dolorum saepe molestias. Vitae ipsam voluptatibus odit inventore atque non totam, quas fugiat doloremque eligendi, corporis, dicta nam. Ducimus, ratione quisquam. Quidem nihil repellat facilis unde tenetur? Eum asperiores pariatur voluptatum aut delectus autem amet est totam corporis, corrupti saepe impedit eveniet vel iure neque, illum odio. Quia quibusdam dolor porro repellendus est! Esse quos molestiae voluptate totam quam, deleniti, repudiandae eum consequatur voluptatem perspiciatis cum vitae similique distinctio temporibus nemo? Accusantium et distinctio facilis veritatis nisi ea quam ab commodi facere, quibusdam at illo quo dolores voluptate hic voluptatibus. Voluptas qui, magnam ipsum suscipit soluta eaque, non aliquid impedit rerum pariatur minima eum veritatis, voluptatibus perspiciatis aperiam dolores? Dolorem numquam fugit, inventore nemo deserunt aperiam a.' # rubocop:disable Layout/LineLength

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
    { title: 'Informatics', description: },
    { title: 'Electronics', description: },
    { title: 'Design',      description: },
    { title: 'Mechanics',   description: }
  ]
)

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
      registration_to:   Date.new(2022, 1, 31)
    },
    {
      id:                2,
      conference_id:     1,
      title:             'Informatics Conference 2023',
      description:,
      date:              Date.new(2023, 5, 5),
      registration_from: Date.new(2023, 2, 1),
      registration_to:   Date.new(2023, 4, 30)
    },
    {
      id:                3,
      conference_id:     1,
      title:             'Informatics Conference 2024',
      description:,
      date:              Date.new(2023, 2, 1),
      registration_from: Date.new(2024, 1, 1),
      registration_to:   Date.new(2024, 1, 20)
    },
    {
      id:                4,
      conference_id:     2,
      title:             'Electronics & Stuff',
      description:,
      date:              Date.new(2022, 10, 1),
      registration_from: Date.new(2022, 9, 1),
      registration_to:   Date.new(2022, 9, 30)
    },
    {
      id:                5,
      conference_id:     2,
      title:             'Electronics & Stuff',
      description:,
      date:              Date.new(2023, 10, 1),
      registration_from: Date.new(2023, 9, 1),
      registration_to:   Date.new(2023, 9, 30)
    },
    {
      id:                6,
      conference_id:     3,
      title:             'Awesome Design Conf',
      description:,
      date:              Date.new(2024, 2, 1),
      registration_from: Date.new(2024, 1, 1),
      registration_to:   Date.new(2024, 1, 31)
    },
    {
      id:                7,
      conference_id:     4,
      title:             'Mechanics & Stuff',
      description:,
      date:              Date.new(2023, 5, 1),
      registration_from: Date.new(2022, 4, 1),
      registration_to:   Date.new(2022, 4, 20)
    }
  ]
)

# Users
# Skip validations on User to not generate password digest for each user individually
password_digest = BCrypt::Password.create('password')

def sample_user_data(password_digest)
  full_name = Faker::Name.name
  email = "#{full_name.split.map(&:downcase).join('.')}@example.com"

  { full_name:, email:, password_digest:, privilege_level: :default }
end

User.insert_all!( # rubocop:disable Rails/SkipsModelValidations
  [
    { full_name: 'John Doe', email: 'admin@example.com', password_digest:, privilege_level: :admin },
    *Array.new(60) { sample_user_data(password_digest) }
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

# Attendances
Attendance.import!(
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
    { status: :approved, user_id: 57, event_id: 7 }
  ]
)

# rubocop:enable Layout/HashAlignment
