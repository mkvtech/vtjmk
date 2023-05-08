class RemoveParticipantsLimitFromEvents < ActiveRecord::Migration[7.0]
  def change
    remove_column :events, :participants_limit, :integer
  end
end
