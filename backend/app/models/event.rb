# Event model
class Event < ApplicationRecord
  extend Mobility

  belongs_to :conference
  has_many :event_reviewers, dependent: :destroy
  has_many :reviewers, through: :event_reviewers

  enum status: { open: 'open', hidden: 'hidden' }

  translates :title, type: :string
  translates :description, type: :text

  validates :status, inclusion: { in: statuses.keys }
  validates :registration_to, comparison: { greater_than_or_equal_to: :registration_from }
  validates :date, comparison: { greater_than_or_equal_to: :registration_to }
end
