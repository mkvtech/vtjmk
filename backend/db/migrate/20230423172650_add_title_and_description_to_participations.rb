class AddTitleAndDescriptionToParticipations < ActiveRecord::Migration[7.0]
  def change
    add_column :participations, :submission_title, :string
    add_column :participations, :submission_description, :text
  end
end
