# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_11_042134) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url"
  end

  create_table "channels", force: :cascade do |t|
    t.string "name", null: false
    t.string "channel_icon", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "group_id"
    t.boolean "dm", null: false
    t.index ["group_id"], name: "index_channels_on_group_id"
  end

  create_table "channelships", force: :cascade do |t|
    t.bigint "channel_id"
    t.bigint "user_id"
    t.boolean "moderator", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_channelships_on_channel_id"
    t.index ["user_id"], name: "index_channelships_on_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.integer "group_id", null: false
    t.string "description", null: false
    t.integer "max_attendance", null: false
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.string "address", null: false
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "recurring_type"
    t.integer "location_id", null: false
    t.index ["group_id"], name: "index_events_on_group_id"
    t.index ["location_id"], name: "index_events_on_location_id"
    t.index ["title"], name: "index_events_on_title"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.float "lat"
    t.float "long"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "location_id", null: false
    t.string "icon_url"
    t.index ["name"], name: "index_groups_on_name"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name", null: false
    t.float "lat", null: false
    t.float "long", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_locations_on_name"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "group_id"
    t.integer "user_id"
    t.string "member_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_memberships_on_group_id"
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "message", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "channel_id"
    t.bigint "user_id"
    t.index ["channel_id"], name: "index_messages_on_channel_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "event_id", null: false
    t.integer "user_id", null: false
    t.boolean "is_organizer", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_reservations_on_event_id"
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "types", force: :cascade do |t|
    t.integer "category_id", null: false
    t.integer "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_types_on_category_id"
    t.index ["group_id"], name: "index_types_on_group_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "password_digest", null: false
    t.string "email", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "lat"
    t.float "long"
    t.string "name", null: false
    t.integer "location_id", null: false
    t.string "image_url"
    t.index ["location_id"], name: "index_users_on_location_id"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "channels", "groups"
  add_foreign_key "channelships", "channels"
  add_foreign_key "channelships", "users"
  add_foreign_key "messages", "channels"
  add_foreign_key "messages", "users"
end
