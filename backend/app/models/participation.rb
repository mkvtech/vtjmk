# Participation model
class Participation < ApplicationRecord
  belongs_to :user
  belongs_to :event

  enum status: { pending: 'pending', approved: 'approved', rejected: 'rejected' }

  validates :status, presence: true
end
