class CreateEventReviewers < ActiveRecord::Migration[7.0]
  def change
    create_table :event_reviewers do |t|
      t.references :event, null: false, foreign_key: true
      t.references :reviewer, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
