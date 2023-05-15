# Participation request review model
class Review < ApplicationRecord
  belongs_to :participation
  belongs_to :user

  enum status: { pending: 'pending', approved: 'approved', rejected: 'rejected' }
end
