class CreateDocumentTemplates < ActiveRecord::Migration[7.0]
  def change
    create_table :document_templates do |t|
      t.string :name, null: false
      t.string :document_type, null: false
      t.string :placeholder_prefix, null: false
      t.string :placeholder_postfix, null: false
      t.references :conference, null: false, foreign_key: true

      t.timestamps
    end
  end
end
