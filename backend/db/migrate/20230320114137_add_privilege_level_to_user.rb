class AddPrivilegeLevelToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :privilege_level, :string, null: false, default: 'default'
  end
end
