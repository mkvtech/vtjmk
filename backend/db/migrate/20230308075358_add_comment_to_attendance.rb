class AddCommentToAttendance < ActiveRecord::Migration[7.0]
  def change
    add_column :attendances, :comment, :string
  end
end
