class AddParticipationUserIndexToReviews < ActiveRecord::Migration[7.0]
  def change
    add_index :reviews, %i[user_id participation_id], unique: true
  end
end
