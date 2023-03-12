# Event model
class Event < ApplicationRecord
  belongs_to :conference

  validates :title, presence: true
end
