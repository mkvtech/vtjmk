# Attendance model
class Attendance < ApplicationRecord
  belongs_to :user
  belongs_to :event

  enum status: { pending: 'pending', approved: 'approved', rejected: 'rejected' }

  validates :event_id, uniqueness: { scope: :user_id }
  validates :status, presence: true
end
