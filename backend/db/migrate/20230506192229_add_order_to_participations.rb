class AddOrderToParticipations < ActiveRecord::Migration[7.0]
  def change
    add_column :participations, :order, :integer
  end
end
