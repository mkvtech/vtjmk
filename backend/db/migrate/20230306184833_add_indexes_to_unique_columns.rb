class AddIndexesToUniqueColumns < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :email, unique: true
    add_index :attendances, %i[event_id user_id], unique: true
  end
end
