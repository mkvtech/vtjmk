class AddRegistrationDatesToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :registration_from, :date, null: false
    add_column :events, :registration_to, :date, null: false
  end
end
