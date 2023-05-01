class RemoveUntranslatedFieldsFromConferences < ActiveRecord::Migration[7.0]
  def change
    remove_column :conferences, :title, :string
    remove_column :conferences, :description, :string
  end
end
