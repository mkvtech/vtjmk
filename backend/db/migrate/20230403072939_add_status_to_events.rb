class AddStatusToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :status, :string, null: false, default: 'open'
  end
end
