class ChangeStatusColumnTypeForParticipation < ActiveRecord::Migration[7.0]
  def up
    change_column :participations, :status, :string
  end

  def down
    change_column :participations, :status, :integer
  end
end
