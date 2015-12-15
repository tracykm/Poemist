# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151215212922) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.string   "author",     null: false
    t.string   "title",      null: false
    t.text     "text",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "poems", force: :cascade do |t|
    t.integer  "author_id",  null: false
    t.text     "passage",    null: false
    t.integer  "book_id",    null: false
    t.integer  "style_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "poems", ["author_id"], name: "index_poems_on_author_id", using: :btree
  add_index "poems", ["book_id"], name: "index_poems_on_book_id", using: :btree
  add_index "poems", ["style_id"], name: "index_poems_on_style_id", using: :btree

  create_table "selected_texts", force: :cascade do |t|
    t.integer  "poem_id",                    null: false
    t.integer  "start_idx",                  null: false
    t.integer  "start_end",                  null: false
    t.boolean  "italicized", default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "selected_texts", ["poem_id"], name: "index_selected_texts_on_poem_id", using: :btree

  create_table "styles", force: :cascade do |t|
    t.boolean  "centered",      default: false
    t.integer  "color_range",   default: 0
    t.integer  "background_id", default: 1
    t.integer  "font_set_id",   default: 1
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "styles", ["background_id"], name: "index_styles_on_background_id", using: :btree
  add_index "styles", ["font_set_id"], name: "index_styles_on_font_set_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
