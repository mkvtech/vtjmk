class MakeRowsNonNullable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :attendances, :status, false

    change_column_null :conferences, :title, false
    change_column_null :conferences, :description, false

    change_column_null :events, :title, false
    change_column_null :events, :description, false
    change_column_null :events, :date, false

    change_column_null :participations, :status, false

    change_column_null :users, :email, false
    change_column_null :users, :password_digest, false
  end
end
