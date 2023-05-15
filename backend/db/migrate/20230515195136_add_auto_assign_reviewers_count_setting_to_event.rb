class AddAutoAssignReviewersCountSettingToEvent < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :auto_assign_reviewers_count, :integer
  end
end
