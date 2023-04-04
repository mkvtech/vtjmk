# Event model
class Event < ApplicationRecord
  belongs_to :conference

  enum status: { open: 'open', hidden: 'hidden' }

  validates :status, inclusion: { in: statuses.keys }
  validates :title, presence: true

  validates :registration_to, comparison: { greater_than_or_equal_to: :registration_from }
  validates :date, comparison: { greater_than_or_equal_to: :registration_to }
end
