# Event model
class Event < ApplicationRecord
  extend Mobility

  belongs_to :conference

  enum status: { open: 'open', hidden: 'hidden' }

  translates :title, type: :string
  translates :description, type: :text

  validates :status, inclusion: { in: statuses.keys }
  validates :registration_to, comparison: { greater_than_or_equal_to: :registration_from }
  validates :date, comparison: { greater_than_or_equal_to: :registration_to }
end
