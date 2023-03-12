class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.date :date
      t.integer :participants_limit
      t.integer :attendees_limit
      t.references :conference, null: false, foreign_key: true

      t.timestamps
    end
  end
end
