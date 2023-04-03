# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_03_072939) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attendances", force: :cascade do |t|
    t.string "status", default: "pending", null: false
    t.bigint "user_id", null: false
    t.bigint "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "comment"
    t.index ["event_id", "user_id"], name: "index_attendances_on_event_id_and_user_id", unique: true
    t.index ["event_id"], name: "index_attendances_on_event_id"
    t.index ["user_id"], name: "index_attendances_on_user_id"
  end

  create_table "conferences", force: :cascade do |t|
    t.string "title", null: false
    t.string "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.string "description", null: false
    t.date "date", null: false
    t.integer "participants_limit"
    t.integer "attendees_limit"
    t.bigint "conference_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "registration_from", null: false
    t.date "registration_to", null: false
    t.string "status", default: "open", null: false
    t.index ["conference_id"], name: "index_events_on_conference_id"
  end

  create_table "participations", force: :cascade do |t|
    t.string "status", null: false
    t.bigint "user_id", null: false
    t.bigint "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "comment"
    t.index ["event_id", "user_id"], name: "index_participations_on_event_id_and_user_id", unique: true
    t.index ["event_id"], name: "index_participations_on_event_id"
    t.index ["user_id"], name: "index_participations_on_user_id"
  end

  create_table "permissions", force: :cascade do |t|
    t.string "action"
    t.bigint "user_id", null: false
    t.string "target_type", null: false
    t.bigint "target_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["target_type", "target_id"], name: "index_permissions_on_target"
    t.index ["user_id"], name: "index_permissions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "full_name", null: false
    t.string "privilege_level", default: "default", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "attendances", "events"
  add_foreign_key "attendances", "users"
  add_foreign_key "events", "conferences"
  add_foreign_key "participations", "events"
  add_foreign_key "participations", "users"
  add_foreign_key "permissions", "users"
end
