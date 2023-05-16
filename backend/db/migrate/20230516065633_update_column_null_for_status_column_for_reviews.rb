class UpdateColumnNullForStatusColumnForReviews < ActiveRecord::Migration[7.0]
  def change
    change_column_null :reviews, :status, false
  end
end
