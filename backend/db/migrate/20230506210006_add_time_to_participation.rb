class AddTimeToParticipation < ActiveRecord::Migration[7.0]
  def change
    add_column :participations, :time, :integer
  end
end
