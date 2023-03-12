# Conference model
class Conference < ApplicationRecord
  validates :title, presence: true
end
