class AddReviewerToParticipations < ActiveRecord::Migration[7.0]
  def change
    add_reference :participations, :reviewer, foreign_key: { to_table: :users }
  end
end
