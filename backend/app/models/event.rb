# Event model
class Event < ApplicationRecord
  belongs_to :conference

  enum status: { open: 'open', hidden: 'hidden' }

  validates :status, inclusion: { in: statuses.keys }
  validates :title, presence: true

  validate :validate_registration_from_before_registration_to
  validate :validate_date_after_registration_period

  def validate_registration_from_before_registration_to
    return if registration_from.blank? || registration_to.blank?
    return if registration_from < registration_to

    errors.add(:base, 'invalid registration period')
  end

  def validate_date_after_registration_period
    return if registration_to.blank? || date.blank?
    return if date > registration_to

    errors.add(:date, 'must be after registration period')
  end
end
