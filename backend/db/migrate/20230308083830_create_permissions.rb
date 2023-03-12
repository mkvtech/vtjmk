class CreatePermissions < ActiveRecord::Migration[7.0]
  def change
    create_table :permissions do |t|
      t.string :action
      t.references :user, null: false, foreign_key: true
      t.references :target, polymorphic: true, null: false

      t.timestamps
    end
  end
end
