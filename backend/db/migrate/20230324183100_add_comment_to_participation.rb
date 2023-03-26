class AddCommentToParticipation < ActiveRecord::Migration[7.0]
  def change
    add_column :participations, :comment, :string
    add_index :participations, %i[event_id user_id], unique: true
  end
end
