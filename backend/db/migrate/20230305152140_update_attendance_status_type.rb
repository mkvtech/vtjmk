class UpdateAttendanceStatusType < ActiveRecord::Migration[7.0]
  def change
    change_column(:attendances, :status, :string, default: :pending)
  end
end
